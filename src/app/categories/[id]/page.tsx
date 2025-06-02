"use client";
import {
    Button,
    Card,
    CardBody,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
  import { useContext, useEffect, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { FiChevronRight, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
  import Link from "next/link";
  import { useParams } from "next/navigation";
  
  //internal import
  import CategoryTable from "@/components/category/CategoryTable";
  import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
  import CheckBox from "@/components/form/others/CheckBox";
  import DeleteModal from "@/components/modal/DeleteModal";
  import Loading from "@/components/preloader/Loading";
  import NotFound from "@/components/table/NotFound";
  import PageTitle from "@/components/Typography/PageTitle";
  import { SidebarContext } from "@/context/SidebarContext";
  import useAsync from "@/hooks/useAsync";
  import useFilter from "@/hooks/useFilter";
  import useToggleDrawer from "@/hooks/useToggleDrawer";
  import CategoryServices from "@/services/CategoryServices";
  import useUtilsFunction from "@/hooks/useUtilsFunction";
  import AnimatedContent from "@/components/common/AnimatedContent";
  
  const ChildCategory = () => {
    const params = useParams();
    const id = params?.id as string;
    const [childCategory, setChildCategory] = useState<any[]>([]);
    const [selectedObj, setSelectObj] = useState<any[]>([]);
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
    const [isCheck, setIsCheck] = useState<string[]>([]);
  
    const { toggleDrawer, lang } = useContext(SidebarContext);
    const { handleDeleteMany, allId, handleUpdateMany } = useToggleDrawer();
    const { data, loading, error } = useAsync(CategoryServices.getAllCategory);
  
    const { showingTranslateValue } = useUtilsFunction();
  
    const { t } = useTranslation();
  
    useEffect(() => {
      const getAncestors = (target: string, children: any[], ancestors: any[] = []) => {
        for (let node of children) {
          if (node._id === target) {
            return ancestors.concat(node);
          }
          const found = getAncestors(
            target,
            node?.children,
            ancestors?.concat(node)
          );
          if (found) {
            return found;
          }
        }
        return undefined;
      };
  
      const findChildArray = (obj: any, target: string): any => {
        return obj._id === target
          ? obj
          : obj?.children?.reduce(
              (acc: any, obj: any) => acc ?? findChildArray(obj, target),
              undefined
            );
      };
  
      if (!loading && data && data[0]) {
        const result = findChildArray(data[0], id);
        const res = getAncestors(id, data[0]?.children);
  
        if (result?.children?.length > 0) {
          setChildCategory(result?.children);
          setSelectObj(res);
        }
      }
    }, [id, loading, data]);
  
    const {
      totalResults,
      resultsPerPage,
      dataTable,
      serviceData,
      handleChangePage,
    } = useFilter(childCategory);
  
    const handleSelectAll = () => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(childCategory?.map((li) => li._id));
      if (isCheckAll) {
        setIsCheck([]);
      }
    };
  
    return (
      <>
        <PageTitle>{t("CategoryPageTitle")}</PageTitle>
  
        <DeleteModal ids={allId} setIsCheck={setIsCheck} category />
  
        <BulkActionDrawer
          ids={allId}
          title="Child Categories"
          lang={lang}
          data={data}
          childId={id}
        />
  
        <AnimatedContent>
          <div className="flex items-center pb-4">
            <ol className="flex items-center w-full overflow-hidden font-serif">
              <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
                <Link href={`/categories`}>{t("Categories")}</Link>
              </li>
              {selectedObj?.map((child, i) => (
                <span key={i + 1} className="flex items-center font-serif">
                  <li className="text-sm mt-[1px]">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer text-blue-700 hover:text-emerald-500 font-semibold ">
                    <Link href={`/categories/${child._id}`}>
                      {showingTranslateValue(child?.name)}
                    </Link>
                  </li>
                </span>
              ))}
            </ol>
          </div>
  
          <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
            <CardBody>
              <div className="flex justify-end items-end">
                <Button onClick={toggleDrawer} className="rounded-md h-12">
                  <span className="mr-3">
                    <FiPlus />
                  </span>
                  {t("AddCategory")}
                </Button>
  
                <div className="ml-3 w-full md:w-24 lg:w-24 xl:w-24">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleUpdateMany(isCheck)}
                    className="w-full rounded-md h-12"
                  >
                    <FiEdit />
                    {t("BulkAction")}
                  </Button>
                </div>
  
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="ml-3 rounded-md h-12 bg-red-500"
                >
                  <span className="mr-3">
                    <FiTrash2 />
                  </span>
                  {t("Delete")}
                </Button>
              </div>
            </CardBody>
          </Card>
        </AnimatedContent>
  
        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <span className="text-center mx-auto text-red-500">{error}</span>
        ) : serviceData?.length !== 0 ? (
          <TableContainer className="mb-8">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>
                    <CheckBox
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      handleClick={handleSelectAll}
                      isChecked={isCheckAll}
                    />
                  </TableCell>
                  <TableCell>{t("catIdTbl")}</TableCell>
                  <TableCell>{t("catIconTbl")}</TableCell>
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Description")}</TableCell>
  
                  <TableCell className="text-center">
                    {t("catPublishedTbl")}
                  </TableCell>
                  <TableCell className="text-right">
                    {t("catActionsTbl")}
                  </TableCell>
                </tr>
              </TableHeader>
  
              <CategoryTable
                categories={dataTable}
                data={data}
                lang={lang}
                isCheck={isCheck}
                setIsCheck={setIsCheck}
                useParamId={id}
              />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
                onChange={handleChangePage}
                label="Table navigation"
              />
            </TableFooter>
          </TableContainer>
        ) : (
          <NotFound title="Sorry, There are no categories right now." />
        )}
      </>
    );
  };
  
  export default ChildCategory;
  