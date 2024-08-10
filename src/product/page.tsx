// src/product/[id].tsx
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Product } from '/public/products.json'; // Adjust import path if necessary

interface Props {
  product: Product;
}

const ProductPage: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      
      <div>
        {product.images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              layout="responsive" // or "fixed" based on your layout needs
            />
            <p>{image.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};