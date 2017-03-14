var bookList = new Vue({
	el: '#bookLib',
	data: {
		books: [{
			id: 1,
			name: '大主宰',
			author: '天蚕土豆',
			price: '39',
			amount: 0,
			singleAllPrice: 0,
			singleCache: 0
		}, {
			id: 2,
			name: '龙族',
			author: '江南',
			price: '59',
			amount: 0,
			singleAllPrice: 0,
			singleCache: 0
		}, {
			id: 3,
			name: '雪鹰领主',
			author: '我吃西红柿',
			price: '89',
			amount: 0,
			singleAllPrice: 0,
			singleCache: 0
		}, {
			id: 4,
			name: '斗战狂潮',
			author: '骷髅精灵',
			price: '99',
			amount: 0,
			singleAllPrice: 0,
			singleCache: 0
		}, ],
		allPrice: 0,
		priceCache: 0,
		newBook:{
			id:null,
			name:"",
			author:"",
			price:"",
			amount:"",
			singleAllPrice: 0,
			singleCache: 0
		}
	},
	methods: {
		bookHandle: function(idx, handle) { //true为添加book
			if(handle || this.books[idx].amount) {
				var amount = handle ? ++this.books[idx].amount : --this.books[idx].amount;
				var cal = this.books[idx].price * amount;
				this.books[idx].singleCache = cal;
				this.books[idx].singleAllPrice = "￥" + cal;

				this.calPrice();
			}
		},
		calPrice: function(){
				this.priceCache = 0;
			for(var i in this.books) {
				this.priceCache += this.books[i].singleCache;
			}
			this.allPrice = '￥' + this.priceCache;
		},
		addBook: function(){
			var a = this.newBook;
			a.id && a.name && a.author && a.price && this.books.push(a);
			this.newBook = {
			id:null,
			name:"",
			author:"",
			price:"",
			amount:0,
			singleAllPrice: 0,
			singleCache: 0
			};
		},
		removeBook: function(idx){
			this.books.splice(idx,1);
			this.priceCache = 0;
			this.calPrice();
		}
	}
})