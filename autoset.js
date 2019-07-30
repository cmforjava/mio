let mio = {
        get first(){
            return this._first
        },
        set first(val){
            this._first = val
        },
        get second(){
            return (this._first + 1)||1
        },
        set second(val){
            this._second = val
        }
}

mio.first = 2
console.log(mio.first)      //2
console.log(mio.second)     //3