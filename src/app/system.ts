import { Particle } from './Particle';


export class System{
	max:number;
	particles:Particle[];

	constructor(m:number, q:number, sp:number, sz:number, w:number, h:number){
		this.max = m;
		this.particles = [];
		for (let i = 0; i < q; i++)
    		this.particles.push(new Particle(sp, sz, w, h));
	}

	update(ctx:CanvasRenderingContext2D, mouse:number[], w:number, h:number, scale:number):void{
		let mX = mouse[0]/scale,
			mY = mouse[1]/scale;

		for (let i:number = 0; i < this.particles.length; i++){
			const p1:Particle = this.particles[i];
			p1.draw(ctx, [(w/scale)/2, (h/scale)/2]);

			for (let i2:number = i + 1; i2 < this.particles.length; i2++){
				let p2:Particle = this.particles[i2],
					  xDist:number = p2.x - p1.x,
      				  yDist:number = p2.y - p1.y,
      				  dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist,2));

      			if (dist < this.max)
        			this.lineDraw(p1.x, p1.y, p2.x, p2.y, dist, ctx, this.max);
			}

			let xDist:number = mX - p1.x,
      			  yDist:number = mY - p1.y,
      		      dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist,2));
      		if (dist < 300)
        			this.lineDraw(p1.x, p1.y, mX, mY, dist, ctx, 300);

			p1.update(w/scale, h/scale, scale);
		}
	}

	lineDraw(x1:number, y1:number, x2:number, y2:number, 
						d:number, ctx:CanvasRenderingContext2D, max:number):void{

		
		const hMax = max/2;
		const alpha = d > hMax ? 1 - ((d - hMax)/hMax) : 1;
		ctx.save();
  		ctx.beginPath();
  		ctx.moveTo(x1,y1);
  		ctx.lineTo(x2, y2);
  		ctx.globalAlpha = alpha/3;
  		ctx.stroke();
  		ctx.closePath();
  		ctx.restore();
	}
}