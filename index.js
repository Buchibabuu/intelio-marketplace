// pages/index.js
import React from 'react'
import Head from 'next/head'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: '9jh6762v',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

export async function getServerSideProps() {
  const products = await client.fetch(`*[_type == "product"]{title, description, price, image}`)
  return { props: { products } }
}

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Intelio Marketplace</title>
      </Head>
      <div style={{ padding: '20px', color: '#fff', background: '#0a0a0a' }}>
        <h1 style={{ color: '#00f0ff' }}>🔥 Intelio Marketplace</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {products.map((product, i) => (
            <div key={i} style={{ background: '#1b1b1b', borderRadius: '12px', padding: '20px' }}>
              <h2 style={{ color: '#00f0ff' }}>{product.title}</h2>
              <p>{product.description}</p>
              <p>💰 ₹{product.price}</p>
              {product.image && (
                <img src={urlFor(product.image).width(300).url()} alt={product.title} style={{ borderRadius: '8px' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
