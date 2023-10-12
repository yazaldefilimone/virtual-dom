import { $nodeCache } from '../memoize/memoize';
import * as t from '../types';
import * as runtimeUtils from './utils';
import { isEqual } from './utils';
type ResultElement = t.NodeElementType | Text;

export function createElement(node: t.NodeType): ResultElement {
  if ($nodeCache.has(node)) return $nodeCache.get(node);
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const $element = document.createElement(node.type);
  runtimeUtils.setProps($element, node.props);
  for (const children of node.children) {
    const $childrenElement = createElement(children);
    $element.appendChild($childrenElement);
  }
  $nodeCache.set(node, $element);
  return $element;
}

export function updateElement(
  $parent: t.NodeElementType,
  index = 0,
  newNode?: t.NodeType,
  oldNode?: t.NodeType,
): boolean {
  if (!$parent) return false;
  if (!$parent.tagName) return false;
  if (!oldNode && !newNode) return false;
  if (!newNode && oldNode) {
    $parent.removeChild($parent.childNodes[index]);
    return true;
  }
  if (!oldNode && newNode) {
    $parent.appendChild(createElement(newNode));
    return true;
  }
  if (changed(newNode, oldNode) && newNode) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    return true;
  }
  if (newNode && oldNode && typeof newNode !== 'string' && typeof oldNode !== 'string') {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let index = 0; index < newLength || index < oldLength; index++) {
      updateElement($parent.childNodes[index] as Element, index, newNode.children[index], oldNode.children[index]);
    }
  }
  return false;
}
function changed(node1?: t.NodeType, node2?: t.NodeType): boolean {
  return !isEqual(node1, node2);
}
export function createNode<T extends HTMLElement>(
  tagName: t.HTMLElementType,
  props: t.NodePropsType<T>,
  children: t.NodeType[],
): t.NodeType {
  return {
    type: tagName,
    props,
    children,
  };
}
