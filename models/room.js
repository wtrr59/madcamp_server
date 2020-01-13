class Room {

    constructor(num) {
        this.top = [];
        this.jungle = [];
        this.mid = [];
        this.bottom = [];
        this.support = [];
        this.num = num;
    }
    
    //userId와 position을 받아서 해당 list의 맨앞에 user추가
    addUser(userId, position){
        console.log(this.num+" "+userId +" "+position);
        if(position === 'top'){
            this.top.unshift(userId);
        }
        else if(position === 'jungle'){
            this.jungle.unshift(userId);
        }
        else if(position === 'mid'){
            this.mid.unshift(userId);
        }
        else if(position === 'bottom'){
            this.bottom.unshift(userId);
        }
        else if(position === 'support'){
            console.log('gg');
            this.support.unshift(userId);
        }
    }

    //userId와 positin을 받아서 해당 list의 user를 지움
    removeUser(userId, position){
        if(position === 'top'){
            for(var i = this.top.length-1; i--;){
                if(this.top[i] === userId) this.top.splice(i,1);
            }
        }
        else if(position === 'jungle'){
            for(var i = this.jungle.length-1; i--;){
                if(this.jungle[i] === userId) this.jungle.splice(i,1);
            }
        }
        else if(position === 'mid'){
            for(var i = this.mid.length-1; i--;){
                if(this.mid[i] === userId) this.mid.splice(i,1);
            }
        }
        else if(position === 'bottom'){
            for(var i = this.bottom.length-1; i--;){
                if(this.bottom[i] === userId) this.bottom.splice(i,1);
            }
        }
        else if(position === 'support'){
            for(var i = this.support.length-1; i--;){
                if(this.support[i] === userId) this.support.splice(i,1);
            }
        }
    }

    //matching이 완료 되었는지 확인
    detectMatched(){
        var count = 0;
        if(this.top.length > 0) count++;
        if(this.jungle.length > 0) count++;
        if(this.mid.length > 0) count++;
        if(this.bottom.length > 0) count++;
        if(this.support.length > 0) count++;

        if(count >= this.num+2) return true;
        else return false;
    }

    //matching이 완료된 room에서 user 빼내기
    removeSet(){
        var count = this.num+2;
        var set = [];
        if(this.top.length > 0 && count > 0){
            set.push(this.top.pop());
            count--;
        }
        if(this.jungle.length > 0 && count > 0){
            set.push(this.jungle.pop());
            count--;
        }
        if(this.mid.length > 0 && count > 0){
            set.push(this.mid.pop());
            count--;
        }
        if(this.bottom.length > 0 && count > 0){
            set.push(this.bottom.pop());
            count--;
        }
        if(this.support.length > 0 && count > 0){
            set.push(this.support.pop());
            count--;
        }
        return set;
    }
}

module.exports = Room;