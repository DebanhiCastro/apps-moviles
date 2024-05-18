import { Injectable } from '@angular/core'; // Importa el decorador Injectable de Angular
import { initializeApp } from 'firebase/app'; // Importa la función para inicializar la app de Firebase
import { environment } from 'src/environments/environment'; // Importa el entorno con la configuración de Firebase
import { 
  Firestore, 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  getFirestore, 
  query, 
  setDoc, 
  where 
} from 'firebase/firestore'; // Importa funciones de Firestore para interactuar con la base de datos
import { Observable } from 'rxjs'; // Importa Observable de RxJS (aunque no se usa en este código)
import { Product } from '../models/product'; // Importa el modelo Product

@Injectable({
  providedIn: 'root' // Declara que este servicio estará disponible en toda la aplicación
})
export class ProductServiceService {
  private db: Firestore; // Variable para almacenar la instancia de Firestore

  constructor() {
    const firebaseApp = initializeApp(environment.firebaseConfig); // Inicializa la app de Firebase con la configuración del entorno
    this.db = getFirestore(firebaseApp); // Obtiene una instancia de Firestore a partir de la app de Firebase
  }

  // Obtener los productos de la base de datos filtrados por idUsuario
  async getProductsByUserId(userId: string): Promise<Product[]> {
    const products: Product[] = []; // Array para almacenar los productos obtenidos
    const q = query(collection(this.db, 'productos'), where('idUsuario', '==', userId)); // Crea una consulta para obtener productos por idUsuario
    const querySnapshot = await getDocs(q); // Ejecuta la consulta y obtiene los documentos
    querySnapshot.forEach((doc) => {
      const data = doc.data(); // Obtiene los datos de cada documento
      const product: Product = {
        id: doc.id,
        idUsuario: data['idUsuario'],
        name: data['name'],
        description: data['description'],
        price: data['price'],
        image: data['image'],
      }; // Crea un objeto Product con los datos del documento
      products.push(product); // Agrega el producto al array
    });
    return products; // Retorna el array de productos
  }

  // Agregar un nuevo producto con el idUsuario
  async addProduct(product: Product): Promise<void> {
    await addDoc(collection(this.db, 'productos'), product); // Agrega un nuevo documento a la colección de productos
  }

  // Obtener un producto por su ID
  async getProductById(productId: string): Promise<Product | null> {
    const docRef = doc(collection(this.db, 'productos'), productId); // Crea una referencia al documento por su ID
    const docSnap = await getDoc(docRef); // Obtiene el documento
    if (docSnap.exists()) {
      const data = docSnap.data(); // Obtiene los datos del documento
      const product: Product = {
        id: docSnap.id,
        idUsuario: data['idUsuario'],
        name: data['name'],
        description: data['description'],
        price: data['price'],
        image: data['image'],
      }; // Crea un objeto Product con los datos del documento
      return product; // Retorna el producto
    } else {
      return null; // Retorna null si el documento no existe
    }
  }

  // Obtener todos los productos de la base de datos
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = []; // Array para almacenar los productos obtenidos
    const querySnapshot = await getDocs(collection(this.db, 'productos')); // Ejecuta una consulta para obtener todos los documentos de la colección de productos
    querySnapshot.forEach((doc) => {
      const data = doc.data(); // Obtiene los datos de cada documento
      const product: Product = {
        id: doc.id,
        idUsuario: data['idUsuario'],
        name: data['name'],
        description: data['description'],
        price: data['price'],
        image: data['image'],
      }; // Crea un objeto Product con los datos del documento
      products.push(product); // Agrega el producto al array
    });
    return products; // Retorna el array de productos
  }

  // Actualizar un producto existente
  async updateProduct(productId: string, product: Product): Promise<void> {
    const docRef = doc(this.db, 'productos', productId); // Crea una referencia al documento por su ID
    await setDoc(docRef, product); // Actualiza el documento con los nuevos datos del producto
  }

  // Eliminar un producto
  async deleteProduct(productId: string): Promise<void> {
    const docRef = doc(this.db, 'productos', productId); // Crea una referencia al documento por su ID
    await deleteDoc(docRef); // Elimina el documento de la colección de productos
  }
}
