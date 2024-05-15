import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
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

  // Obtener los productos de la base de datos filtrados por idUsuario
  async getProductsByUserId(userId: string): Promise<Product[]> {
    const products: Product[] = [];
    const q = query(collection(this.db, 'productos'), where('idUsuario', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const product: Product = {
        id: doc.id,
        idUsuario: data['idUsuario'],
        name: data['name'],
        description: data['description'],
        price: data['price'],
        image: data['image'],
      };
      products.push(product);
    });
    return products;
  }

  // Agregar un nuevo producto con el idUsuario
  async addProduct(product: Product): Promise<void> {
    await addDoc(collection(this.db, 'productos'), product);
  }

  // Obtener un producto por su ID
  async getProductById(productId: string): Promise<Product | null> {
    const docRef = doc(collection(this.db, 'productos'), productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const product: Product = {
        id: docSnap.id,
        idUsuario: data['idUsuario'],
        name: data['name'],
        description: data['description'],
        price: data['price'],
        image: data['image'],
      };
      return product;
    } else {
      return null;
    }
  }
  // Obtener todos los productos de la base de datos
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'productos'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const product: Product = {
        id: doc.id,
        idUsuario: data['idUsuario'],
        name: data['name'],
        description: data['description'],
        price: data['price'],
        image: data['image'],
      };
      products.push(product);
    });
    return products;
  }
  // Actualizar un producto existente
  async updateProduct(productId: string, product: Product): Promise<void> {
    const docRef = doc(this.db, 'productos', productId);
    await setDoc(docRef, product);
  }

  // Eliminar un producto
  async deleteProduct(productId: string): Promise<void> {
    const docRef = doc(this.db, 'productos', productId);
    await deleteDoc(docRef);
  }
}
