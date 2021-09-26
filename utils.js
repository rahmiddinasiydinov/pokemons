let $ = (para, child = document) => {
    return child.querySelector(para);
}
let createEl = el => document.createElement(el);