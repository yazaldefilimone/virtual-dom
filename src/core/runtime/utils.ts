import { CSSProperties } from 'react';
import * as t from '../types';
import { memoize } from '../memoize/memoize';

export function setProps($target: t.NodeElementType, props: t.NodePropsType) {
  const styles = props.style;
  if (styles) {
    $target.setAttribute('style', createTransformCSSPropertiesToString(styles));
  }
  for (const [key, value] of Object.entries(props)) {
    if (key !== 'style') {
      setProp($target, key, value);
    }
  }
}

function setProp($target: t.NodeElementType, key: string, value: string) {
  $target.setAttribute(key, value);
}

const createTransformCSSPropertiesToString = memoize((css: CSSProperties): string => {
  let generate = '';
  for (const [key, value] of Object.entries(css)) {
    generate += `${camelToKebabCase(key)}:${value}; `;
  }
  return generate;
});

const camelToKebabCase = (input: string): string => {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export function compareTypeof(left: unknown, right: unknown): boolean {
  return typeof left === right;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEqual(left: any, right: any): boolean {
  // Verificar se os tipos são estritamente iguais
  if (typeof left !== typeof right) {
    return false;
  }

  // Verificar se ambos são objetos
  if (typeof left === 'object' && left && right) {
    // Comparar propriedades de objetos
    const keysLeft = Object.keys(left);
    const keysRight = Object.keys(right);
    if (keysLeft.length !== keysRight.length) {
      return false;
    }
    for (const key of keysLeft) {
      if (!isEqual(left[key], right[key])) {
        return false;
      }
    }

    return true;
  }

  // Comparação simples para outros tipos de dados
  return left === right;
}
