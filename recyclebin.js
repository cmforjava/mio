/**
 * Created by Mio on 2019/3/14.
 */

let mioc = {
    /*
     * data: 数据源
     * indexs: 下标数组或者下标字符串
     * nil: 默认值 不填为''
     */
    mget: (data, indexs, nil = '') => {
        let arr = indexs
        if (typeof indexs === 'string') {
            arr = indexs.split(',')
        }
        let result
        try {
            arr.map((p) => {
                data = data[p]
            })
            result = data || nil
        } catch (e) {
            result = nil
        }
        return result
    },
    /*
    * oristring: 原始字符串
    */
    getmaxsubstr: (oristring)=>{
        /*result string*/
        let resstring=''
        
        /*result length*/
        let reslength=0
        
        /*result index*/
        let resindex=0
        
        /*/!*temp string*!/
         let tempstring=''
         
         /!*temp length*!/
         let templength=1
         
         /!*temp index*!/
         let tempindex=0*/
        
        let gettempstr = (tempindex, templength)=>{
            return oristring.substr(tempindex, templength)
        }
        for(let tempindex=0, templength=0, tempstring=''; tempindex+templength<oristring.length-1; tempindex++){
            tempstring = gettempstr(tempindex,templength)
            while(oristring.appeartimes(tempstring)>1){
                tempstring = gettempstr(tempindex, ++templength)
            }
            if(templength>reslength){
                resstring = gettempstr(tempindex, --templength)
                reslength = templength
                resindex = tempindex
            }
        }
        return {
            str: resstring,
            length: reslength,
            index: resindex
        }
    }
}
/*appear times*/
String.prototype.appeartimes = function (substring){
    return this.split(substring).length-1
}
module.exports =  mioc