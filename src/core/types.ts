import { AllHTMLAttributes } from 'react';

export type HTMLElementType = keyof HTMLElementTagNameMap;
export type NodePropsType<T = Element> = AllHTMLAttributes<T> & {
  class?: string;
};
export type NodeChildrenType = NodeType[];

type VNode<T = Element> = {
  type: HTMLElementType;
  props: NodePropsType<T>;
  children: NodeChildrenType;
};

export type NodeElementType = Element;
export type NodeType<T = Element> = VNode<T> | HTMLElementType | string;
