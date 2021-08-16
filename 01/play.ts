import { 
    tokenArray, 
    Token,
    Tokenizer,
    TokenKind,
} from './token';
import { 
    Program, 
    Statement, 
    FunctionBody,
    FunctionCall,
    FunctionDeclare,
} from './ast';

type nullOrVoid = null | void;

class Parser {
    private tokenizer: Tokenizer;
    constructor(tokenizer: Tokenizer) {
        this.tokenizer = tokenizer;
    }
    // 解析 Program 
    // program = (functionDecl | functionCall)* ;
    parseProgram(): Program {
        let statementsArr: Statement[] = [],
            statement: Statement | nullOrVoid = null;
        while (true) {
            // 判断是否是函数声明
            statement = this.parseFunctionDeclare();
            if (statement !== null) {
                statementsArr.push(statement as Statement);
                continue;
            }
            // 判断是否是函数调用
            statement = this.parseFunctionCall();
            if (statement !== null) {
                statementsArr.push(statement as Statement);
                continue;
            }
            // 都不是就直接结束
            break; 
        }
        return new Program(statementsArr);
    }
    // 解析 function 声明
    parseFunctionDeclare(): FunctionDeclare | nullOrVoid {
        let oldPosition: number = this.tokenizer.getPosition();
        if (this.tokenizer.next().text === 'function') {
            let functionName: Token = this.tokenizer.next();
            // 判断函数名
            if (functionName.kind === TokenKind.Identifier) {
                // 判断分隔符 (
                // TODO 不支持传参数
                if (this.tokenizer.next().text === '(') {
                    // 判断分隔符 )
                    if (this.tokenizer.next().text === ')') {
                        let functionBody: FunctionBody | nullOrVoid = this.parseFunctionBody();
                        if (functionBody !== null) {
                            return new FunctionDeclare(functionName.text, functionBody as FunctionBody);
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
    parseFunctionBody(): FunctionBody | nullOrVoid {
        let oldPosition: number = this.tokenizer.getPosition(),
            statementsArr: FunctionCall[] = [];
        // TODO 只支持调用内部函数
        if (this.tokenizer.next().text === '{') {
            let functionCall: FunctionCall | nullOrVoid = this.parseFunctionCall();
            // 解析函数体
            while (functionCall !== null) {
                statementsArr.push(functionCall as FunctionCall);
                // 继续解析
                functionCall = this.parseFunctionCall();   
            }
            if (this.tokenizer.next().text === '}') {
                return new FunctionBody(statementsArr);
            }
        }
        //如果解析不成功，回溯，返回null。
        this.tokenizer.traceBack(oldPosition);
        return null;
    }
    // 解析 function 调用
    parseFunctionCall(): FunctionCall | nullOrVoid {
        let oldPosition: number = this.tokenizer.getPosition(),
            paramsArr: string[] = [],
            functionName: Token = this.tokenizer.next();
        if (functionName.kind === TokenKind.Identifier) {
            if (this.tokenizer.next().text === '(') {
                let param: Token = this.tokenizer.next();
                // 读取参数
                while (param.text !== ')') {
                    if (param.kind === TokenKind.StringLiteral) {
                        paramsArr.push(param.text);
                    } else {
                        console.log('参数出错！！！');
                        return;
                    }
                    param = this.tokenizer.next();
                    if (param.text !== ')') {
                        // 参数使用 , 分隔开
                        if (param.text === ',') {
                            param = this.tokenizer.next();
                        } else {
                            console.log('请使用 , 分割参数！！！');
                            return; 
                        }
                    }
                }
                // 使用 ; 结尾
                if (this.tokenizer.next().text === ';') {
                    return new FunctionCall(functionName.text, paramsArr);
                } else {
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
    
}
class Interpreter {

}
// 入口程序
const main = () => {
    // 词法分析
    const tokenizer = new Tokenizer(tokenArray);
    console.log('\n程序所使用的Token:');
    for (let token of tokenArray){
        console.log(token);
    }
    // 语法分析
    let program: Program = new Parser(tokenizer).parseProgram();
    console.log('\n%c语法分析后的AST:', 'color:#0f0;');
    program.dump('');
    // 语义分析

    // 程序运行

}
// 运行实例
main();