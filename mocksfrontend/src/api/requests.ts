export const api ={
	get: async <T>(url:string, init?: RequestInit|undefined)=>{
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, init);

		if(!response.ok){
			throw new Error(response.statusText);
		}

		return response.json() as Promise<T>;
	},

	post: async <ReqT,ResT>(url:string, body?:ReqT|undefined, init?: RequestInit|undefined)=>{
		const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
			...init,
			method:"POST",
			body:body ? JSON.stringify(body) : undefined,
			headers:{
				"Content-Type":"application/json"
			}
		});

		if(!response.ok){
			throw new Error(response.statusText);
		}

		return response.json() as Promise<ResT>;
	}
}