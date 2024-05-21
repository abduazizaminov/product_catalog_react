import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { consoleLog, MessageLogType } from '../../shared/lib';
import {Axios} from "../../shared/api";
import {Product} from "../../shared/types";

interface ProductFilter {
    brand_id: number | null;
    price_gte: string| null;
    price_lte: string| null;
    type_id: number | null;
}
interface Categories {
    id: number;
    name: string
}
interface Brands {
    id: number;
    name: string;
    type_id: number;
}

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filter: ProductFilter;
    category: Categories[];
    brands: Brands[],
    productInfo: Product,
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
    filter: {} as unknown as ProductFilter,
    category: [],
    brands: [],
    productInfo: {} as unknown as Product
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filter: ProductFilter) => {
    const response = await Axios.get<Product[]>('/products', {
        params: filter
    });
    return response.data;
});
export const getCategory = createAsyncThunk('products/getCategory', async () => {
    const response = await Axios.get<Product[]>('/types');
    return response.data;
});
export const getBrands = createAsyncThunk('products/getBrands', async (id: number | undefined) => {
    const response = await Axios.get<Product[]>('/brands', {
        params: { type_id: id }
    });
    return response.data;
});
export const getProductInfo = createAsyncThunk('products/getProductInfo', async (id: number) => {
    const response = await Axios.get<Product[]>(`/products?id=${id}`);
    return response.data
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<ProductFilter>) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                consoleLog('Success [fetchProducts]', MessageLogType.Success);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
                consoleLog(`Error [fetchProducts]: ${action.error.message}`, MessageLogType.Error);
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.category = action.payload;
                consoleLog('Success [getCategory]', MessageLogType.Success);
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.status = 'failed';
                consoleLog(`Error [getCategory]: ${action.error.message}`, MessageLogType.Error);
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload;
                consoleLog('Success [getBrands]', MessageLogType.Success);
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.status = 'failed';
                consoleLog(`Error [getBrands]: ${action.error.message}`, MessageLogType.Error);
            })
            .addCase(getProductInfo.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.productInfo = action.payload[0];
                consoleLog('Success [getProductInfo]', MessageLogType.Success);
            })
            .addCase(getProductInfo.rejected, (state, action) => {
                state.status = 'failed';
                consoleLog(`Error [getProductInfo]: ${action.error.message}`, MessageLogType.Error);
            })
    }
});

export const { setFilter } = productsSlice.actions;
export default productsSlice.reducer;

