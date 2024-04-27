import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private db: Firestore;

  constructor() {
    const firebaseApp = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(firebaseApp);
  }
//obtine los productos de la base de datos
  async getProducts(): Promise<Product[]> {
    const products: Product[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'productos')); // Cambio aquí a 'productos'
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const product: Product = {
        id: doc.id,
        name: data['name'], // Corregir acceso a la propiedad 'name'
        description: data['description'], // Corregir acceso a la propiedad 'description'
        price: data['price'], // Corregir acceso a la propiedad 'price'
        image: data['image'], // Corregir acceso a la propiedad 'image'
      };
      products.push(product);
    });
    return products;
  }

  // Agregar un nuevo producto
  async addProduct(product: Product): Promise<void> {
    await addDoc(collection(this.db, 'productos'), product); // Cambio aquí a 'productos'
  }

  // Obtener un producto por su ID
  async getProductById(productId: string): Promise<Product | null> {
    const docRef = doc(collection(this.db, 'productos'), productId); // Cambio aquí a 'productos'
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const product: Product = {
        id: docSnap.id,
        name: data['name'], // Corregir acceso a la propiedad 'name'
        description: data['description'], // Corregir acceso a la propiedad 'description'
        price: data['price'], // Corregir acceso a la propiedad 'price'
        image: data['image'], // Corregir acceso a la propiedad 'image'
      };
      return product;
    } else {
      return null;
    }
  }

  // Actualizar un producto existente
  async updateProduct(productId: string, product: Product): Promise<void> {
    const docRef = doc(this.db, 'productos', productId); // Cambio aquí a 'productos'
    await setDoc(docRef, product);
  }

  // Eliminar un producto
  async deleteProduct(productId: string): Promise<void> {
    const docRef = doc(this.db, 'productos', productId); // Cambio aquí a 'productos'
    await deleteDoc(docRef);
  }
}
