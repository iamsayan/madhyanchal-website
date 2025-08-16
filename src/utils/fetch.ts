import { generateUrlSearchParams } from "@/utils/functions";

interface ApiResponse {
    [key: string]: any;
}

export async function getModel(model: string, params: Record<string, any> = {}): Promise<ApiResponse> {
    const type = params.type ?? 'items';
    delete params.type;

    if (type === 'items') {
        params = { skip: 0, limit: 1000, ...params };
    }
    
    const response = await fetch(`${process.env.API_URL}/content/${type}/${generateUrlSearchParams(model, params)}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: [`model-${model}`],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export async function getModels(models: Record<string, any>, populate: -1 | 0 | 1 = 0): Promise<ApiResponse> {
    const route = generateUrlSearchParams('items', { models, populate });
    const response = await fetch(`${process.env.API_URL}/content/${route}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: Object.keys(models).map((key) => `model-${key}`),
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export async function getImagesData(): Promise<ApiResponse> {
    const response = await fetch(`https://assets.madhyanchalsarbajanin.co.in/images/api.php`, {
        method: "GET",
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}
