'use client';

import { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone, FileRejection } from "react-dropzone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import Pica from "pica";

// Internal imports
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { notifyError, notifySuccess } from "@/utils/toast";
import Container from "@/components/image-uploader/Container";

type UploaderProps = {
  setImageUrl: (url: string | string[]) => void;
  imageUrl: string | string[];
  product?: boolean;
  folder: string;
  targetWidth?: number;
  targetHeight?: number;
};

const Uploader = ({
  setImageUrl,
  imageUrl,
  product,
  folder,
  targetWidth = 800,
  targetHeight = 800,
}: UploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setError] = useState<string>("");
  const pica = Pica();
  const { globalSetting } = useUtilsFunction();

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: product ? true : false,
    maxSize: 5242880,
    maxFiles: globalSetting?.number_of_image_per_product || 2,
    onDrop: async (acceptedFiles: File[]) => {
      const resizedFiles = await Promise.all(
        acceptedFiles.map((file) =>
          resizeImageToFixedDimensions(file, targetWidth, targetHeight)
        )
      );
      setFiles(
        resizedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const resizeImageToFixedDimensions = async (
    file: File,
    width: number,
    height: number
  ): Promise<File> => {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);

    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    return new Promise((resolve) => {
      pica
        .resize(img, canvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        })
        .then((result: HTMLCanvasElement) => pica.toBlob(result, file.type, 0.9))
        .then((blob: Blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          resolve(resizedFile);
        });
    });
  };

  useEffect(() => {
    if (fileRejections) {
      fileRejections.map(({ file, errors }: FileRejection) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>
                {e.code === "too-many-files"
                  ? notifyError(
                      `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
                    )
                  : notifyError(e.message)}
              </li>
            ))}
          </ul>
        </li>
      ));
    }

    if (files) {
      files.forEach((file) => {
        if (
          product &&
          (Array.isArray(imageUrl) ? imageUrl.length : 0) + files.length >
            globalSetting?.number_of_image_per_product
        ) {
          return notifyError(
            `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
          );
        }

        setLoading(true);
        setError("Uploading....");

        const name = file.name.replaceAll(/\s/g, "");
        const public_id = name?.substring(0, name.lastIndexOf("."));

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
        );
        formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME || "");
        formData.append("folder", folder);
        formData.append("public_id", public_id);

        axios({
          url: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: formData,
        })
          .then((res) => {
            notifySuccess("Image Uploaded successfully!");
            setLoading(false);
            if (product) {
              setImageUrl((imgUrl: string[]) => [...imgUrl, res.data.secure_url]);
            } else {
              setImageUrl(res.data.secure_url);
            }
          })
          .catch((err) => {
            console.error("err", err);
            notifyError(err.Message);
            setLoading(false);
          });
      });
    }
  }, [files]);

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <div>
        <img
          className="inline-flex border-2 border-gray-100 w-24 max-h-24"
          src={file.preview}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleRemoveImage = async (img: string) => {
    try {
      setLoading(false);
      notifyError("Image delete successfully!");
      if (product) {
        const result = (imageUrl as string[])?.filter((i) => i !== img);
        setImageUrl(result);
      } else {
        setImageUrl("");
      }
    } catch (err: any) {
      console.error("err", err);
      notifyError(err.Message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-center">
      <div
        className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-emerald-500" />
        </span>
        <p className="text-sm mt-2">{t("DragYourImage")}</p>
        <em className="text-xs text-gray-400">{t("imageFormat")}</em>
      </div>

      <div className="text-emerald-500">{loading && err}</div>
      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="relative">
            <img
              className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
              src={imageUrl as string}
              alt="product"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 focus:outline-none"
              onClick={() => handleRemoveImage(imageUrl as string)}
            >
              <FiXCircle />
            </button>
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </div>
  );
};

export default Uploader;
