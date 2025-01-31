export namespace excel {
	
	export class RowRequest {
	    quantity: number;
	    description: string;
	    justification: string;
	
	    static createFrom(source: any = {}) {
	        return new RowRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.quantity = source["quantity"];
	        this.description = source["description"];
	        this.justification = source["justification"];
	    }
	}
	export class RequestFormPayload {
	    to: string;
	    from: string;
	    service: boolean;
	    materials: boolean;
	    equipment: boolean;
	    rowReq: RowRequest[];
	
	    static createFrom(source: any = {}) {
	        return new RequestFormPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.to = source["to"];
	        this.from = source["from"];
	        this.service = source["service"];
	        this.materials = source["materials"];
	        this.equipment = source["equipment"];
	        this.rowReq = this.convertValues(source["rowReq"], RowRequest);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

