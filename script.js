const keys = document.getElementById('keys');
let content = "";

class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (!(this.isEmpty())) {
            this.items.pop();
        }
    }

    top() {
        if (!(this.isEmpty())) {
            return this.items[this.items.length - 1];
        }
    }

    isEmpty() {
        return this.items.length === 0;
    }

}


function getPriority(C) {
    if (C == '-' || C == '+')
        return 1;
    else if (C == '*' || C == '/')
        return 2;
    else if (C == '^')
        return 3;
}

function infixToPostfix(value) {
    size = value.length;
    const stack = new Stack();
    const postfix=[];
    index=0;

    for (i = 0; i < size; i++) {
        if (value[i] != '+' && value[i] != '-' && value[i] != '*' && value[i] != '/' && value[i] != '^') {
            postfix[index++]= value[i];
        }
        else {
            while (!stack.isEmpty() && getPriority(value[i]) <= getPriority(stack.top())) {
                postfix[index++]= stack.top();
                stack.pop();
            }

            stack.push(value[i]);
        }
    }
    while (!stack.isEmpty()) {
        postfix[index++]= stack.top();
        stack.pop();
    }
    return postfix;
}

function solvePostfix(value) {
    const stack=new Stack();
    const size=value.length;
    let result=content;

    for(i=0;i<size;i++)
    {
        let a="";
        let b="";
        if(value[i]=='+'){
            a=parseFloat(stack.top());
            stack.pop();
            b=parseFloat(stack.top());
            stack.pop();
            result=(a+b);
            stack.push(result);
        }
        else if(value[i]=='-'){
            a=parseFloat(stack.top());
            stack.pop();
            b=parseFloat(stack.top());
            stack.pop();
            result=(b-a);
            stack.push(result);
        }
        else if(value[i]=='*'){
            a=parseFloat(stack.top());
            stack.pop();
            b=parseFloat(stack.top());
            stack.pop();
            result=(b*a);
            stack.push(result);
        }
        else if(value[i]=='/'){
            a=parseFloat(stack.top());
            stack.pop();
            b=parseFloat(stack.top());
            stack.pop();
            result=(b/a);
            stack.push(result);
        }
        else if(value[i]=='^'){
            a=parseFloat(stack.top());
            stack.pop();
            b=parseFloat(stack.top());
            stack.pop();
            result= Math.pow(b, a);
            stack.push(result);
        }
        else{
            stack.push(value[i]);
        }
    }
    content=result;
}

keys.addEventListener('click', function (event) {

    if(content=="Invalid Expression"){
        content="";
        document.getElementById('display').innerText = content;
    }

    if (event.target.id != '=' && event.target.id != 'AC' && event.target.id != 'DEL' && event.target.id !='keys') {
        const pressedKeyId = event.target.id;
        content += pressedKeyId;
    }
    else if (event.target.id == 'AC') {
        content = "";
    }
    else if (event.target.id == 'DEL') {
        content += "";
        content = content.slice(0, -1);
    }
    else if(event.target.id=='=') {
        let digit="";
        let size=content.length;

        let expression=[];
        let index=0;

        for(i=0;i<size;i++)
        {
            if(content[i]=='+' || content[i]=='-' || content[i]=='*' || content[i]=='/' || content[i]=='^')
            {
                expression[++index]=content[i];
                index++;
                digit="";
            }
            else
            {
                digit+=content[i];
                expression[index]=digit;
            }
        }

        solvePostfix(infixToPostfix(expression));
    }
    if(Number.isNaN(content)){
        content="Invalid Expression";
    }
    document.getElementById('display').innerText = content;
});
