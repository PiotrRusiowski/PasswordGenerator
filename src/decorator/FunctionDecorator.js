"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.FunctionDecorator = void 0;
const FunctionDecorator = (target, name, descriptor) => {
  console.log(
      "---------------------------- INSIDE DECORATOR ----------------------------"
  );
};
exports.FunctionDecorator = FunctionDecorator;
