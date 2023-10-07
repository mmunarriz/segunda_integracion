import { Router } from 'express';
import Products from '../dao/dbManagers/products.js';

const productsManager = new Products();
const router = Router();

// Listar productos con "query params" en la URL
router.get('/', async (req, res) => {
    try {
        // Obtener y validar los "query params" de la URL
        const limit = req.query.limit ? parseInt(req.query.limit) : 8;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const query = req.query.query || '';
        const sort = req.query.sort || '';
        const queryOptions = {};

        // Verificar si se busca por disponibilidad (stock mayor que 0)
        if (query.toLowerCase() === 'available') {
            queryOptions.stock = { $gt: 0 };
        } else {
            queryOptions.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: `^${query}$`, $options: 'i' } }, // Coincidir con la categoría exacta
            ];
        }

        // Llamar al método getAll de la clase Products con los "query params"
        const result = await productsManager.getAll(limit, page, queryOptions, sort);

        const response = {
            status: "success",
            payload: result.products,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
        };

        // Agregar enlaces directos a la página previa 'prevLink' y siguiente 'nextLink'
        if (result.hasPrevPage) {
            response.prevLink = `/api/products?page=${result.prevPage}&limit=${limit}&query=${query}&sort=${sort}`;
        }
        if (result.hasNextPage) {
            response.nextLink = `/api/products?page=${result.nextPage}&limit=${limit}&query=${query}&sort=${sort}`;
        }

        res.send(response);
    } catch (error) {
        res.status(500).send({ status: "error", error: "No se pudieron obtener productos debido a un error interno" });
    }
});

export default router;
