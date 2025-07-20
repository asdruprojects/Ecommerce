/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: cesar.avilatek@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           example: migato123
 *         name:
 *           type: string
 *           example: Cesar Mendez
 *       required:
 *         - email
 *         - password
 *         - name
 * 
 *     SignUpResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Usuario creado exitosamente
 *         data:
 *           $ref: '#/components/schemas/CreatedUser'
 * 
 *     CreatedUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 07e734b3-2049-483e-b410-55b8f2adb6fe
 *         email:
 *           type: string
 *           format: email
 *           example: cesar.avilatek@gmail.com
 *         name:
 *           type: string
 *           example: Cesar Mendez
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-20T17:40:24.639Z
 *         role:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: e8cbfebf-e232-46a3-9262-e3a9c5952a01
 *             name:
 *               type: string
 *               example: customer
 * 
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: admin@ecommerce.com
 *         password:
 *           type: string
 *           example: Admin123*
 *       required:
 *         - email
 *         - password
 * 
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         key:
 *           type: string
 * 
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Permission'
 * 
 *     AuthenticatedUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *         role:
 *           $ref: '#/components/schemas/Role'
 *  
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Login exitoso
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *             user:
 *               $ref: '#/components/schemas/AuthenticatedUser'
 *      
 *     RefreshTokenResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Sesión renovada exitosamente
 *         data:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: Token JWT renovado
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyMTA0Yjg4LTU0MzAtNDFlNS04YWQxLTI0MGY2NGQ5MmMwNiIsImVtYWlsIjoiYWRtaW5AZWNvbW1lcmNlLmNvbSIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiaWF0IjoxNzUzMDM0NzA3LCJleHAiOjE3NTMwMzU5MDd9.zBviyd5jcKIVkAKUCInppglCVOE0k8IXlLi1bK0QXz8
 *  
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 781ac883-d4dc-4914-96b4-7ee210a1a7a1
 *         name:
 *           type: string
 *           example: Lavavajillas Bosch
 *         description:
 *           type: string
 *           example: Es un lavavajillas Bosch
 *         price:
 *           type: number
 *           example: 350
 *         stock:
 *           type: integer
 *           example: 21
 *         status:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-20T03:28:57.980Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-20T14:40:42.430Z
 *  
 *     ProductsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Productos disponibles obtenidos correctamente
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 2
 *             offset:
 *               type: integer
 *               example: 0
 *             limit:
 *               type: integer
 *               example: 10
 *             page:
 *               type: integer
 *               example: 1
 *             totalPages:
 *               type: integer
 *               example: 1
 *    
 *     ProductByIdResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Producto obtenido correctamente
 *         data:
 *           $ref: '#/components/schemas/Product'
 *  
 *     AllProductsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Todos los productos obtenidos correctamente
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 2
 *             offset:
 *               type: integer
 *               example: 0
 *             limit:
 *               type: integer
 *               example: 10
 *             page:
 *               type: integer
 *               example: 1
 *             totalPages:
 *               type: integer
 *               example: 1
 *    
 *     ProductRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Lavavajillas Balay
 *         price:
 *           type: number
 *           format: float
 *           example: 600
 *         stock:
 *           type: integer
 *           example: 4
 *         description:
 *           type: string
 *           example: Es un lavavajillas Balay
 *       required:
 *         - name
 *         - price
 *         - stock
 *  
 *     CreateProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Producto creado exitosamente
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: ef2a1ca0-cfee-4f6f-a9dd-1011b6b728d9
 *             name:
 *               type: string
 *               example: Lavavajillas Beko
 *             description:
 *               type: string
 *               example: Es un lavavajillas Beko
 *             price:
 *               type: number
 *               format: float
 *               example: 350.5
 *             stock:
 *               type: integer
 *               example: 4
 *             status:
 *               type: boolean
 *               example: true
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:05:19.650Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:05:19.650Z
 *      
 *     UpdateProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Producto actualizado exitosamente
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: 505f58d6-38b7-471d-87e4-168c4e66e4e5
 *             name:
 *               type: string
 *               example: Lavavajillas Bosch
 *             description:
 *               type: string
 *               example: Es un lavavajillas Bosch
 *             price:
 *               type: number
 *               format: float
 *               example: 350
 *             stock:
 *               type: integer
 *               example: 40
 *             status:
 *               type: boolean
 *               example: true
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:04:53.620Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:25:36.491Z
 *  
 *     DeleteProductResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Producto eliminado exitosamente
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: 505f58d6-38b7-471d-87e4-168c4e66e4e5
 *             name:
 *               type: string
 *               example: Lavavajillas Bosch
 *             description:
 *               type: string
 *               example: Es un lavavajillas Bosch
 *             price:
 *               type: number
 *               format: float
 *               example: 350
 *             stock:
 *               type: integer
 *               example: 40
 *             status:
 *               type: boolean
 *               example: false
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:04:53.620Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:40:40.843Z
 *  
 *     OrderItemRequest:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           format: uuid
 *           example: ee8197df-bc71-41f1-ac34-7d1380f69fa1
 *         quantity:
 *           type: integer
 *           example: 20
 *       required:
 *         - productId
 *         - quantity
 *  
 *     CreateOrderRequest:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemRequest'
 *       required:
 *         - items
 *  
 *     ProductSummary:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: ee8197df-bc71-41f1-ac34-7d1380f69fa1
 *         name:
 *           type: string
 *           example: Lavavajillas Balay
 *         description:
 *           type: string
 *           example: Es un lavavajillas Balay
 *         price:
 *           type: number
 *           format: float
 *           example: 600
 *  
 *     OrderItemResponse:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           example: 20
 *         product:
 *           $ref: '#/components/schemas/ProductSummary'
 *  
 *     CreateOrderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Pedido creado exitosamente
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: f24d09f0-7339-406a-b54c-8a96aeef19b4
 *             userId:
 *               type: string
 *               format: uuid
 *               example: 6b41b31c-b009-44ca-96b1-b5aef64b8de5
 *             status:
 *               type: string
 *               example: PENDIENTE
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:53:43.020Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:53:43.020Z
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItemResponse'
 *   
 *     OrderSummary:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: d432eb69-fb8e-46a9-9c8d-91171fbb03a6
 *         userId:
 *           type: string
 *           format: uuid
 *           example: 4ea8c8e2-d06f-4b7a-aa96-033d23591a50
 *         status:
 *           type: string
 *           example: PENDIENTE
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-20T19:59:03.861Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-07-20T19:59:03.861Z
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemResponse'
 *  
 *     GetOrdersResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Pedidos del usuario obtenidos correctamente
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderSummary'
 *         meta:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 1
 *             offset:
 *               type: integer
 *               example: 0
 *             limit:
 *               type: integer
 *               example: 10
 *             page:
 *               type: integer
 *               example: 1
 *             totalPages:
 *               type: integer
 *               example: 1
 *        
 *     UserSummary:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 4ea8c8e2-d06f-4b7a-aa96-033d23591a50
 *         email:
 *           type: string
 *           format: email
 *           example: cesar.avilatek@gmail.com
 *         name:
 *           type: string
 *           example: Cesar Mendez
 *  
 *     OrderDetailResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Pedido obtenido correctamente
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *               example: d432eb69-fb8e-46a9-9c8d-91171fbb03a6
 *             userId:
 *               type: string
 *               format: uuid
 *               example: 4ea8c8e2-d06f-4b7a-aa96-033d23591a50
 *             status:
 *               type: string
 *               example: PENDIENTE
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:59:03.861Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-07-20T19:59:03.861Z
 *             user:
 *               $ref: '#/components/schemas/UserSummary'
 *             items:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quantity:
 *                     type: integer
 *                     example: 20
 *                   product:
 *                     $ref: '#/components/schemas/ProductSummary'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         statusCode:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: Error general
 *  
 *     ErrorNotFound:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *         - type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 404
 *             message:
 *               type: string
 *               example: Producto no encontrado
 *  
 *     ErrorUnauthorized:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *         - type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 401
 *             message:
 *               type: string
 *               example: Token inválido
 *  
 *     ErrorForbidden:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *         - type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 403
 *             message:
 *               type: string
 *               example: El usuario no tiene permiso para acceder a este recurso
 *    
 *     ErrorValidationFailed:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *         - type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 400
 *             message:
 *               type: string
 *               example: Validación fallida
 *             errors:
 *               type: array
 *               items:
 *                 type: string
 *               example:
 *                 - La cantidad debe ser un entero mayor que 0
 *  
 *     ErrorInternalServer:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *         - type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 500
 *             message:
 *               type: string
 *               example: Error interno del servidor
 *    
 */
