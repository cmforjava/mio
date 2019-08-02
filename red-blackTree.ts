class Branch {
    protected _lchild: Branch
    protected _rchild: Branch
    protected _type: string
    protected _value: any
    constructor(props){
        this._lchild = props.lchild
        this._rchild = props.rchild
        this._value = props.value
    }
    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
    get lchild(): Branch {
        return this._lchild||new Branch({});
    }

    set lchild(value: Branch) {
        this._lchild = value;
    }
    get rchild(): Branch {
        return this._rchild||new Branch({});
    }

    set rchild(value: Branch) {
        this._rchild = value;
    }
}

class Black extends Branch{
    protected _lchild: Branch
    protected _rchild: Branch
    constructor(props){
        super(props)
        this.type = 'Black'
    }
}

class Red extends Branch{
    protected _lchild: Black
    protected _rchild: Black
    constructor(props){
        super(props)
        this.type = 'Red'
    }


}
// let bl = new Black({value: 1})
// let br = new Black({value: 2})
//
// let rl = new Red({lchild: bl,rchild: br, value: 5})
//
// let root = new Black({lchild:rl,rchild: rl,value: 3})


let arr: number[] = [2,3,7,9,5,4,67,89]
let root = new Branch({value: 12,lchild: new Branch({}),})

arr.map((res:number)=>{
    let current = root
    if(!(res<current.value&&!current.lchild.value)||(res>current.value&&!current.rchild.value)){

            console.log(current,'current')
            console.log(root,'root')
            console.log(res,'res',current.value,'value', current.lchild.value,'lv', current.rchild.value,'rv')

    }
    while(current.value&&!(res<current.value&&!current.lchild.value)||(res>current.value&&!current.rchild.value)){

        if(res>current.value){

            console.log(current.value,'value', current.lchild.value,'lv', current.rchild.value,'rv')
            current = current.rchild

        }else{

            console.log(current.value,'value2', current.lchild.value,'lv2', current.rchild.value,'rv2')
            current = current.lchild
        }
    }
    console.log('执行',!(res<current.value&&!current.lchild.value)||(res>current.value&&!current.rchild.value))
    if(res>current.value){
        current.rchild = new Branch({value: res})
    }else{
        current.lchild = new Branch({value: res})
    }
})

console.log(root)