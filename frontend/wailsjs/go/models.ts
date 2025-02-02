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

export namespace repository {
	
	export class CreateMaintenanceLogParams {
	    emitter: string;
	    fault_description: string;
	    issuing_department: string;
	    maintenance_number: string;
	    // Go type: time
	    date_of_maintenance: any;
	    used_materials: string;
	    maintenance_technician: string;
	    result?: string;
	    observations?: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateMaintenanceLogParams(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.emitter = source["emitter"];
	        this.fault_description = source["fault_description"];
	        this.issuing_department = source["issuing_department"];
	        this.maintenance_number = source["maintenance_number"];
	        this.date_of_maintenance = this.convertValues(source["date_of_maintenance"], null);
	        this.used_materials = source["used_materials"];
	        this.maintenance_technician = source["maintenance_technician"];
	        this.result = source["result"];
	        this.observations = source["observations"];
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
	export class MaintenanceLog {
	    id: number;
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	    emitter: string;
	    fault_description: string;
	    issuing_department: string;
	    maintenance_number: string;
	    // Go type: time
	    date_of_maintenance: any;
	    used_materials: string;
	    maintenance_technician: string;
	    result?: string;
	    observations?: string;
	
	    static createFrom(source: any = {}) {
	        return new MaintenanceLog(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	        this.emitter = source["emitter"];
	        this.fault_description = source["fault_description"];
	        this.issuing_department = source["issuing_department"];
	        this.maintenance_number = source["maintenance_number"];
	        this.date_of_maintenance = this.convertValues(source["date_of_maintenance"], null);
	        this.used_materials = source["used_materials"];
	        this.maintenance_technician = source["maintenance_technician"];
	        this.result = source["result"];
	        this.observations = source["observations"];
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

