//Token的类型
export enum TokenKind {
    Keyword, 
    Identifier, 
    StringLiteral, 
    Separator, 
    Operator, 
    EOF
};
// 代表一个Token的数据结构
export interface Token {
    kind: TokenKind;  
    text: string;
}
// Token流
//一个函数的声明，这个函数很简单，只打印"Hello World!"
// function sayHello(){
//     println("Hello World!");
// }
export const tokenArray: Token[] = [
    { kind: TokenKind.Keyword,      text:'function' },
    { kind: TokenKind.Identifier,   text:'sayHello' },
    { kind: TokenKind.Separator,    text:'(' },
    { kind: TokenKind.Separator,    text:')' },
    { kind: TokenKind.Separator,    text:'{' },
    { kind: TokenKind.Identifier,   text:'println' },
    { kind: TokenKind.Separator,    text:'(' },
    { kind: TokenKind.StringLiteral,text:'Hello World!' },
    { kind: TokenKind.Separator,    text:')' },
    { kind: TokenKind.Separator,    text:';' },
    { kind: TokenKind.Separator,    text:'}' },
    { kind: TokenKind.Identifier,   text:'sayHello' },
    { kind: TokenKind.Separator,    text:'(' },
    { kind: TokenKind.Separator,    text:')' },
    { kind: TokenKind.Separator,    text:';' },
    { kind: TokenKind.EOF,          text:''}
];

export class Tokenizer {
    private tokens: Token[];
    private position: number;
    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.position = 0;
    }
    public getPosition(): number {
        return this.position;
    }
    public next(): Token {
        // 数组越界直接返回最后一个
        return this.tokens[this.position++] || 
               this.tokens[this.tokens.length - 1];
    }
    public traceBack(oldPosition: number) {
        this.position = oldPosition;
    }
}