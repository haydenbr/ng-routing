import { ProductDbService } from './product-db.service';
import { ProductResolverService } from './product-resolver.service';
import { ProductService } from './product.service';

export { ProductDbService } from './product-db.service';
export { ProductResolverService } from './product-resolver.service';
export { ProductService } from './product.service';

export const SERVICES = [ ProductDbService, ProductResolverService, ProductService ];
