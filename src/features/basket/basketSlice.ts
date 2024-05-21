import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {Axios} from "../../shared/api";
import {Product} from "../../shared/types";
import { consoleLog, MessageLogType } from '../../shared/lib';

interface ProductFilter {
    brand_id: string;
    price_gte: string;
    price_lte: string;
    type_id: string;
}

interface ProductsState {
    items: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filter: ProductFilter;
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
    filter: {} as unknown as ProductFilter
};

export const fetchBasketProducts = createAsyncThunk('products/fetchBasketProducts', async () => {
    const response = await Axios.get<Product[]>(`/products?is_in_basket=${true}`);
    return response.data;
});
export const updateOrderStatus = createAsyncThunk('products/updateOrderStatus', async (product: Product) => {
    const updatedProduct = { ...product };
    updatedProduct.is_in_basket = !updatedProduct.is_in_basket;
    const response = await Axios.patch<Product[]>(`/products/${updatedProduct.id}`, updatedProduct);
    fetchBasketProducts
    return response.data;
});

const productsSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<ProductFilter>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasketProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasketProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBasketProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                consoleLog('Success [updateOrderStatus]', MessageLogType.Success);

            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.status = 'failed';
                consoleLog(`Error [updateOrderStatus]: ${action.error.message}`, MessageLogType.Error);
            });
    }
});

export const { setFilter } = productsSlice.actions;
export default productsSlice.reducer;

