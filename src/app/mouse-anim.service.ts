import { Injectable, NgZone } from '@angular/core';
import { System } from './system';


@Injectable()
export class MouseAnimService {
	card:HTMLElement;
	coord:number[];
	center:number[];
	enable:boolean;
	cardPos:number[];
	system:System;
	scale:number;
	gitCol:boolean;
	events:Object;

	constructor(private zone: NgZone){}

	enableAnimService(cardID:string, canvasID:string, pQuant:number, 
						pSize:number, rD: number, pSpeed:number): void {
		this.gitCol = false;
		this.enable = true;
		this.cardPos = [];
		this.coord = [];
		this.center = [];
		this.events = {};

		this.zone.runOutsideAngular(()=>{
			const canvas = <HTMLCanvasElement> window.document.getElementById(canvasID),
				    context:CanvasRenderingContext2D = canvas.getContext('2d'),
				    container:HTMLElement = window.document.getElementById('pContainer'),
				    winWidth:number = container.offsetWidth,
				    winHeight:number = container.offsetHeight,
				    offLeft:number = container.getBoundingClientRect().left;

			let throttle:boolean = true;
			this.setCvs(true, canvas, context, winWidth, winHeight);
			this.card = window.document.getElementById(cardID);
			this.center = [winWidth/2, winHeight/2];

			const w:number=  winWidth/this.scale;
			let h = winHeight/this.scale;

			this.system = new System(rD, pQuant, pSpeed, pSize, w, h);

			
			const update = ()=>{
				let w:number = container.offsetWidth,
					h:number = container.offsetHeight;

				this.center = [w/2 + offLeft, h/2];
				this.manipCard();
				this.detectCollision();
				
				this.center = [window.innerWidth/2, window.innerHeight/2];
				if (throttle){	
					this.setCvs(false, canvas, context, w, h);
					
					context.strokeStyle = "#1F3A93";
					context.fillStyle = "#1F3A93";
					context.globalAlpha = .333;
					const mouse = [
						this.coord[0] - offLeft,
						this.coord[1]
					]
					this.system.update(context, mouse, w, h, this.scale);
				}
				throttle = !throttle;
				if (this.enable)
					window.requestAnimationFrame(update.bind(this));
			}

			this.events['m'] = this.setMCoord.bind(this);
			this.events['c'] = this.reDirect.bind(this);
			this.events['f'] = window.requestAnimationFrame(update.bind(this));
			window.document.addEventListener('mousemove', this.events['m'], true);
			window.document.addEventListener('click', this.events['c'], true);
		});
	}

	cancelService():void{
		this.enable = false;
		this.zone.runOutsideAngular(()=>{
			window.cancelAnimationFrame(this.events['f']);
			window.document.removeEventListener('mousemove', this.events['m'], true);
			window.document.removeEventListener('click', this.events['c'], true);
		});
	}
	reDirect():void{
		const g:HTMLElement = document.getElementById('git');
		if (!g) return;

		const gRect:ClientRect = g.getBoundingClientRect(),
		      wH:boolean = this.coord[1] > gRect.top && this.coord[1] < gRect.bottom,
		      wW:boolean = this.coord[0] > gRect.left && this.coord[0] < gRect.right;

		if (wH && wW)
			window.location.href = "http://www.philipcheek.com";
	}
	setMCoord(e:any):void{
		this.coord = [e.pageX, e.pageY];
	}

	setCvs(init:boolean, cvs:HTMLCanvasElement, ctx:CanvasRenderingContext2D, w:number, h:number):void{
		if (init){
			cvs.style.position = 'absolute';
			cvs.style.top = "0";
		}

		this.scale = w < h ? w/1200 : h/1200;
		cvs.width = w;
		cvs.height = h;
		ctx.scale(this.scale, this.scale);
	}

	detectCollision():void{
		const g:HTMLElement = document.getElementById('git');
		if (!g) return;

		const gRect:ClientRect = g.getBoundingClientRect(),
		      wH:boolean = this.coord[1] > gRect.top && this.coord[1] < gRect.bottom,
		      wW:boolean = this.coord[0] > gRect.left && this.coord[0] < gRect.right;

		if (wH && wW){
			g.style.color = "#81b3d2";
			window.document.body.style.cursor = "pointer";
		}else if (this.gitCol){
			g.style.color = "black";
			window.document.body.style.cursor = "initial";
		}

		this.gitCol = wH && wH;
	}

	manipCard(): void{
		const c = this.coord.length > 0,
							l = this.cardPos.length > 0,
					    mX = l && this.cardPos[0] == this.coord[0],
					    mY = l && this.cardPos[1] == this.coord[1],
					    match = mX && mY;
				
		if (c && match) return;

		const w:number = this.center[0],
        	h:number = this.center[1],
       		x:number = (w - this.coord[0])/(-15),
        	y:number = (h - this.coord[1])/15,
			r:string = "rotateY(" + x + "deg) rotateX(" + y + "deg)",
			s:string[] = ["transform", "webkitTranform", "mozTransform"];

		for (let i of s){
			this.card.style[i] = r;
			this.cardPos = [this.coord[0],this.coord[1]];
		}
	}
	


}