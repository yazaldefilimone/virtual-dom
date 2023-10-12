import { createNode, updateElement } from './core/runtime';
const item1 = createNode('li', {}, ['item 1']);
const item2 = createNode('li', {}, ['item 1']);
const me = createNode(
  'li',
  {
    style: {
      color: 'blue',
    },
  },
  ['Yazalde'],
);
const tk = createNode(
  'li',
  {
    style: {
      color: 'red',
    },
  },
  ['Tk'],
);

const ComponentME = createNode('ul', { class: 'list' }, [item1, item2, me]);
const ComponentTK = createNode('ul', { class: 'list' }, [item1, item2, tk]);

const $root = document.getElementById('app');
const $reload = document.getElementById('reload');

$root && updateElement($root, 0, ComponentME);
let is = false;
$reload?.addEventListener('click', () => {
  if ($root) {
    if (is) {
      updateElement($root, 0, ComponentTK, ComponentME);
    } else {
      updateElement($root, 0, ComponentME, ComponentTK);
    }
    is = !is;
  }
});
