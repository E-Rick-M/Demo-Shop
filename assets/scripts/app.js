

class Product{
    title;
    ImageUrl;
    price;
    description;

    constructor(title,image,price,desc){
        this.title=title
        this.ImageUrl=image;
        this.price=price;
        this.description=desc
    }
}

class ElementAttribute{
    constructor(attrName,attrValue){
        this.name=attrName
        this.value=attrValue
    }
}

class Component{
    constructor(renderHookId,shouldRender=true){
        this.hookId=renderHookId;
        if(shouldRender){
           this.render();  
        }
       
    }

    render(){

    }

    createRootElement(tag,cssClasses,attributes){
        const rootElement=document.createElement(tag);
        if(cssClasses){
            rootElement.className=cssClasses;
        }
        if(attributes && attributes.length>0){
            for(const attr of attributes){
                rootElement.setAttribute(attr.name,attr.value)
            }
        }
        document.getElementById(this.hookId).append(rootElement)
        return rootElement;
    }
}

class ShoppingCart extends Component{
    items=[];
    set cartItems(value){
        this.items=value;
          this.totalOutput.innerHTML=`<h2>Total: Ksh ${this.totalAmount.toFixed(2)}</h2>`
    }

    get totalAmount(){
        const sum=this.items.reduce((prevValue,curItem)=>{
            return prevValue+curItem.price
        },0)
        return sum;
    }

    constructor(renderHookId){
        super(renderHookId);
    }

    addProduct(product){
        // this.items.push(product);
        const updatedItems=[...this.items];
        updatedItems.push(product)
        this.cartItems=updatedItems
      
    }

    orderProducts(){
        console.log('Ordering!...');
        console.log(this.items)
    }

    render(){
        const cartEl=this.createRootElement('section','cart')
        
        cartEl.innerHTML=`
        <h2>Total: Ksh ${0}</h2>
        <button>Order Now!</button>
        `;
        const orderButton=cartEl.querySelector('button')
        orderButton.addEventListener('click',this.orderProducts.bind(this))
        this.totalOutput=cartEl.querySelector('h2')
    }
}


// Logic to render a single product Item
class ProductItem extends Component{
    constructor(product,renderHookId){
        super(renderHookId,false)
        this.product=product
        this.render();
    }

    addToCart(){
        console.log('Adding Product To cart.....')
        App.addProductToCart(this.product);
        console.log(this.product)

    }

    render(){
        const prodEl=this.createRootElement('li','product-item')
                prodEl.innerHTML=`
                <div>
                <img src="${this.product.ImageUrl}" alt="${this.product.title}">
                 <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h2>Ksh ${this.product.price}</h2>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                 </div>
                </div>
                `;
                const addCartButton=prodEl.querySelector('button');
                addCartButton.addEventListener('click',this.addToCart.bind(this));
                
    }
}

class ProductList extends Component{
    products=[]
    constructor(renderHookId){
        super(renderHookId)
       this.fetchProducts()
    
    }; 
    fetchProducts() {
             this.products=[
            new Product('A pillow','https://imgs.search.brave.com/xpD02yj8NJ9xx1K9r0Pr5dAkkhJUzLfBcT9RZa_nXjo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzM3NTc4NTUyL3Iv/aWwvNDUxYzkwLzQx/NzcxMDk3MTIvaWxf/NjAweDYwMC40MTc3/MTA5NzEyXzZiaWsu/anBn',19.99,'A soft Pillow'),
            new Product('A Carpet','https://imgs.search.brave.com/TwoCf0_RFHCCt2ybt3XHu6jMM3lgCSdsrj8ikO4fH80/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/NzgzNTk0L3Bob3Rv/L3BlcnNpYW4tY2Fy/cGV0cy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9cmRKUTlf/emplSUZ5Z2I3amsw/OEdKbzN0aVkyRExl/MWFxNjU5ZC1hU2lG/cz0',89.99,'A Carpet you may like')
        
        ];
        this.renderProducts()
    }

    renderProducts(){
         for(const prod of this.products){
                new ProductItem(prod,'prod-list');
            
            }
    }
        render(){
           
            this.createRootElement('ul','product-list',[new ElementAttribute('id','prod-list')])
           if(this.products && this.products.lenghth>0){
            this.renderProducts()
           }
        }

}

class Shop extends Component{
    constructor(){
        super();
    }
    render(){
        this.cart=new ShoppingCart('app');
        new ProductList('app');
    }
}

class App{
    static cart;

    static init(){
     const shop=new Shop();
    this.cart=shop.cart
    }

    static addProductToCart(product){
        this.cart.addProduct(product)
    }
}

App.init();



