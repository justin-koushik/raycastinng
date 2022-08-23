const can=document.querySelector("canvas")
const w=500
const h=500
can.width=w
can.height=h
// can.style.border="1px solid"
const ctx=can.getContext("2d")
const TAU=2*Math.PI
let mousePos=[w/2,h/2]
class bulb{
    constructor(nrays=500,nwalls=10){
        this.nrays=nrays

        this.rays=new Array(nrays)
        for(let i=0;i<nrays;i++){
            let ang=i*TAU/nrays
            this.rays[i]=ang
        }
        this.nwalls=nwalls
        this.walls=new Array(nwalls)
        for(let i=0;i<nwalls-4;i++){
            let x1,x2,y1,y2
            x1=Math.random()*w/2
            y1=Math.random()*h
            x2=Math.random()*w
            y2=Math.random()*h/2
            this.walls[i]=[x1,y1,x2,y2]
        }
        this.walls[nwalls-1]=[0,0,w,0]
        this.walls[nwalls-2]=[0,0,0,h]
        this.walls[nwalls-3]=[w,0,w,h]
        this.walls[nwalls-4]=[0,h,w,h]
    }
    findIntersect(ray){
        let x1=mousePos[0]
        let y1=mousePos[1]
        let x2=x1+2*Math.cos(ray)
        let y2=y1+2*Math.sin(ray)
        let x3,y3,x4,y4,u,num,den,dist=Infinity,best=null,Px,Py,t
        for(let wall of this.walls){
            x3=wall[0]
            y3=wall[1]
            x4=wall[2]
            y4=wall[3]
            num=(x1-x3)*(y1-y2)-(y1-y3)*(x1-x2)
            den=(x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)
            if(den){
                u=num/den
                num=(x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)
                t=num/den
                if(t>0 && u>=0 && u<=1){
                    Px=x3+u*(x4-x3)
                    Py=y3+u*(y4-y3)
                    let temp=(x1-Px)**2+(y1-Py)**2
                    if(temp<dist){
                        best=[Px,Py]
                        dist=temp
                    }
                }
            }
        }
        return best
    }
    incident(){
        ctx.clearRect(0,0,w,h)
        ctx.strokeStyle="black"
        for(let wall of this.walls){
            ctx.beginPath()
            ctx.moveTo(wall[0],wall[1])
            ctx.lineTo(wall[2],wall[3])
            ctx.stroke()
            ctx.closePath()
        }
        ctx.strokeStyle="purple"
        for(let ray of this.rays){
            console.log(ray)
            let best=this.findIntersect(ray)
            if(best){
                ctx.beginPath()
                ctx.moveTo(mousePos[0],mousePos[1])
                ctx.lineTo(best[0],best[1])
                ctx.stroke()
                ctx.closePath()
            }
        }
    }
}
let a=new bulb()
a.incident()
// a.draw()
can.onmousemove=(e)=>{
    mousePos[0]=e.x
    mousePos[1]=e.y
    a.incident()
}