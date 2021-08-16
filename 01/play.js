"use strict";
exports.__esModule = true;
var token_1 = require("./token");
var ast_1 = require("./ast");
var Parser = /** @class */ (function () {
    function Parser(tokenizer) {
        this.tokenizer = tokenizer;
    }
    // 解析 Program 
    // program = (functionDecl | functionCall)* ;
    Parser.prototype.parseProgram = function () {
        var statementsArr = [], statement = null;
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
    };
    // 解析 function 声明
    Parser.prototype.parseFunctionDeclare = function () {
        var oldPosition = this.tokenizer.getPosition();
        if (this.tokenizer.next().text === 'function') {
            var functionName = this.tokenizer.next();
            // 判断函数名
            if (functionName.kind === token_1.TokenKind.Identifier) {
                // 判断分隔符 (
                // TODO 不支持传参数
                if (this.tokenizer.next().text === '(') {
                    // 判断分隔符 )
                    if (this.tokenizer.next().text === ')') {
                        var functionBody = this.parseFunctionBody();
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
    };
    // 解析 function 内容
    Parser.prototype.parseFunctionBody = function () {
        var oldPosition = this.tokenizer.getPosition(), statementsArr = [];
        // TODO 只支持调用内部函数
        if (this.tokenizer.next().text === '{') {
            var functionCall = this.parseFunctionCall();
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
    };
    // 解析 function 调用
    Parser.prototype.parseFunctionCall = function () {
        var oldPosition = this.tokenizer.getPosition(), paramsArr = [], functionName = this.tokenizer.next();
        if (functionName.kind === token_1.TokenKind.Identifier) {
            if (this.tokenizer.next().text === '(') {
                var param = this.tokenizer.next();
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
        //如果解析不成功，回溯，返回null。
        this.tokenizer.traceBack(oldPosition);
        return null;
    };
    return Parser;
}());
var RefResolver = /** @class */ (function () {
    function RefResolver() {
    }
    return RefResolver;
}());
var Interpreter = /** @class */ (function () {
    function Interpreter() {
    }
    return Interpreter;
}());
// 入口程序
var main = function () {
    // 词法分析
    var tokenizer = new token_1.Tokenizer(token_1.tokenArray);
    console.log('\n程序所使用的Token:');
    for (var _i = 0, tokenArray_1 = token_1.tokenArray; _i < tokenArray_1.length; _i++) {
        var token = tokenArray_1[_i];
        console.log(token);
    }
    // 语法分析
    var program = new Parser(tokenizer).parseProgram();
    console.log('\n%c语法分析后的AST:', 'color:#0f0;');
    program.dump('');
    // 语义分析
    // 程序运行
};
// 运行实例
main();
