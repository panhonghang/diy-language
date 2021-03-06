"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokenizer = exports.tokenArray = exports.TokenKind = void 0;
//Token的类型
var TokenKind;
(function (TokenKind) {
    TokenKind[TokenKind["Keyword"] = 0] = "Keyword";
    TokenKind[TokenKind["Identifier"] = 1] = "Identifier";
    TokenKind[TokenKind["StringLiteral"] = 2] = "StringLiteral";
    TokenKind[TokenKind["Separator"] = 3] = "Separator";
    TokenKind[TokenKind["Operator"] = 4] = "Operator";
    TokenKind[TokenKind["EOF"] = 5] = "EOF";
})(TokenKind = exports.TokenKind || (exports.TokenKind = {}));
;
// Token流
//一个函数的声明，这个函数很简单，只打印"Hello World!"
// function sayHello(){
//     println("Hello World!");
// }
exports.tokenArray = [
    { kind: TokenKind.Keyword, text: 'function' },
    { kind: TokenKind.Identifier, text: 'sayHello' },
    { kind: TokenKind.Separator, text: '(' },
    { kind: TokenKind.Separator, text: ')' },
    { kind: TokenKind.Separator, text: '{' },
    { kind: TokenKind.Identifier, text: 'println' },
    { kind: TokenKind.Separator, text: '(' },
    { kind: TokenKind.StringLiteral, text: 'Hello World!' },
    { kind: TokenKind.Separator, text: ')' },
    { kind: TokenKind.Separator, text: ';' },
    { kind: TokenKind.Separator, text: '}' },
    { kind: TokenKind.Identifier, text: 'sayHello' },
    { kind: TokenKind.Separator, text: '(' },
    { kind: TokenKind.Separator, text: ')' },
    { kind: TokenKind.Separator, text: ';' },
    { kind: TokenKind.EOF, text: '' }
];
class Tokenizer {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }
    getPosition() {
        return this.position;
    }
    next() {
        // 数组越界直接返回最后一个
        return this.tokens[this.position++] ||
            this.tokens[this.tokens.length - 1];
    }
    traceBack(oldPosition) {
        this.position = oldPosition;
    }
}
exports.Tokenizer = Tokenizer;
