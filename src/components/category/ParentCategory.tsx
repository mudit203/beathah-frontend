'use client';

import Multiselect from "multiselect-react-dropdown";
import Tree from "rc-tree";
import { Key } from "rc-tree/lib/interface";
import { ReactElement } from "react";

//internal import
import useAsync from "@/hooks/useAsync";
import { notifySuccess } from "@/utils/toast";
import CategoryServices from "@/services/CategoryServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";

interface Category {
  _id: string;
  name: string;
  children?: Category[];
  // Add other properties if they exist
}

interface SelectedCategory {
  _id: string;
  name: string;
}

interface ParentCategoryProps {
  selectedCategory: SelectedCategory[];
  setSelectedCategory: (categories: SelectedCategory[]) => void;
  setDefaultCategory: (categories: SelectedCategory[]) => void;
}

const ParentCategory = ({
  selectedCategory,
  setSelectedCategory,
  setDefaultCategory,
}: ParentCategoryProps): ReactElement => {
  const { data, loading } = useAsync<Category[]>(CategoryServices?.getAllCategory);
  const { showingTranslateValue } = useUtilsFunction();

  const STYLE = `
    .rc-tree-child-tree {
      display: block;
    }
    .node-motion {
      transition: all .3s;
      overflow-y: hidden;
    }
  `;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node: HTMLElement) => ({ height: 0 }),
    onAppearActive: (node: HTMLElement) => ({ height: node.scrollHeight }),
    onLeaveStart: (node: HTMLElement) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories: Category[]): any[] => {
    return categories.map((category) => ({
      title: showingTranslateValue(category.name),
      key: category._id,
      children: category?.children?.length > 0 
        ? renderCategories(category.children) 
        : undefined,
    }));
  };

  const findObject = (obj: Category, target: string): Category | undefined => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce<Category | undefined>(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  const handleSelect = (key: Key) => {
    if (!data || data.length === 0) return;
    
    const obj = data[0];
    const result = findObject(obj, key.toString());

    if (result !== undefined) {
      const getCategory = selectedCategory.filter(
        (value) => value._id === result._id
      );

      if (getCategory.length !== 0) {
        return notifySuccess("This category already selected!");
      }

      setSelectedCategory((prev) => [
        ...prev,
        {
          _id: result._id,
          name: showingTranslateValue(result.name),
        },
      ]);
      setDefaultCategory([
        {
          _id: result._id,
          name: showingTranslateValue(result.name),
        },
      ]);
    }
  };

  const handleRemove = (v: SelectedCategory[]) => {
    setSelectedCategory(v);
  };

  return (
    <>
      <div className="mb-2">
        <Multiselect
          displayValue="name"
          groupBy="name"
          isObject={true}
          hidePlaceholder={true}
          onKeyPressFn={() => {}}
          onRemove={handleRemove}
          onSearch={() => {}}
          onSelect={handleSelect}
          selectedValues={selectedCategory}
          placeholder="Select Category"
        />
      </div>

      {!loading && data !== undefined && (
        <div className="draggable-demo capitalize">
          <style dangerouslySetInnerHTML={{ __html: STYLE }} />
          <Tree
            expandAction="click"
            treeData={renderCategories(data)}
            onSelect={(v) => handleSelect(v[0])}
            motion={motion}
            animation="slide-up"
          />
        </div>
      )}
    </>
  );
};

export default ParentCategory;