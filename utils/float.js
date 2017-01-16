exports.float = {
  prefix: 'f',
  prop: 'float',
  vals: [
    'left',
    'right',
    'none'
  ]
}

exports.clear = {
  prefix: 'cf:after',
  declaration: `
    content:"";
    display:block;
    clear:both
  `
}