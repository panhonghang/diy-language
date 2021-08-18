"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const ast_1 = require("./ast");
class Parser {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
    }
    // 解析 Program 
    // program = (functionDecl | functionCall)* ;
    parseProgram() {
        let statementsArr = [], statement = null;
        while (true) {
            // 判断是否是函数声明
            statement = this.parseFunctionDeclare();
            if (statement !== null) {
                statementsArr.push(statement);
                continue;
            }
            // 判断是否是函数调用
            statement = this.parseFunctionCall();
            if (statement !== null) {
                statementsArr.push(statement);
                continue;
            }
            // 都不是就直接结束
            break;
        }
        return new ast_1.Program(statementsArr);
    }
    // 解析 function 声明
    parseFunctionDeclare() {
        let oldPosition = this.tokenizer.getPosition();
        if (this.tokenizer.next().text === 'function') {
            let functionName = this.tokenizer.next();
            // 判断函数名
            if (functionName.kind === token_1.TokenKind.Identifier) {
                // 判断分隔符 (
                // TODO 不支持传参数
                if (this.tokenizer.next().text === '(') {
                    // 判断分隔符 )
                    if (this.tokenizer.next().text === ')') {
                        let functionBody = this.parseFunctionBody();
                        if (functionBody !== null) {
                            return new ast_1.FunctionDeclare(functionName.text, functionBody);
                        }
                    }
                }
            }
        }
        // 如果解析不成功，回退并且返回 null。
        this.tokenizer.traceBack(oldPosition);
        return null;
    }
    // 解析 function 内容
    parseFunctionBody() {
        let oldPosition = this.tokenizer.getPosition(), statementsArr = [];
        // TODO 只支持调用内部函数
        if (this.tokenizer.next().text === '{') {
            let functionCall = this.parseFunctionCall();
            // 解析函数体
            while (functionCall !== null) {
                statementsArr.push(functionCall);
                // 继续解析
                functionCall = this.parseFunctionCall();
            }
            if (this.tokenizer.next().text === '}') {
                return new ast_1.FunctionBody(statementsArr);
            }
        }
        //如果解析不成功，回溯，返回null。
        this.tokenizer.traceBack(oldPosition);
        return null;
    }
    // 解析 function 调用
    parseFunctionCall() {
        let oldPosition = this.tokenizer.getPosition(), paramsArr = [], functionName = this.tokenizer.next();
        if (functionName.kind === token_1.TokenKind.Identifier) {
            if (this.tokenizer.next().text === '(') {
                let param = this.tokenizer.next();
                // 读取参数
                while (param.text !== ')') {
                    if (param.kind === token_1.TokenKind.StringLiteral) {
                        paramsArr.push(param.text);
                    }
                    else {
                        console.log('参数出错！！！');
                        return;
                    }
                    param = this.tokenizer.next();
                    if (param.text !== ')') {
                        // 参数使用 , 分隔开
                        if (param.text === ',') {
                            param = this.tokenizer.next();
                        }
                        else {
                            console.log('请使用 , 分割参数！！！');
                            return;
                        }
                    }
                }
                // 使用 ; 结尾
                if (this.tokenizer.next().text === ';') {
                    return new ast_1.FunctionCall(functionName.text, paramsArr);
                }
                else {
                    console.log('请使用 ; 结尾！！！');
                }
            }
        }
        // 如果解析不成功，回溯，返回null。
        this.tokenizer.traceBack(oldPosition);
        return null;
    }
}
class RefResolver {
    constructor() {
        this.program = null;
    }
    visitProgram(prog) {
        console.log(prog);
        this.program = prog;
        for (let x of prog.statements) {
            let functionCall = x;
            // 
            if (typeof functionCall.parameters === 'object') {
            }
            else {
            }
        }
    }
    ;
    visitFunctionBody() {
    }
    ;
    resolveFunctionCall() {
    }
    ;
    findFunctionDeclare() {
    }
    ;
}
class Interpreter {
}
// 入口程序
const main = () => {
    // 词法分析
    const tokenizer = new token_1.Tokenizer(token_1.tokenArray);
    console.log('\n程序所使用的Token:');
    for (let token of token_1.tokenArray) {
        console.log(token);
    }
    // 语法分析
    let program = new Parser(tokenizer).parseProgram();
    console.log('\n语法分析后的AST:');
    program.dump('');
    // 语义分析
    new RefResolver().visitProgram(program);
    // console.log("\n语义分析后的AST:");
    // program.dump("");
    // 程序运行
};
// 运行实例
main();
