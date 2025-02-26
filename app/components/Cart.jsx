// // components/Cart.js
// "use client";

// import { Observer } from "mobx-react-lite";
// import cartStore from "../store/cartStore";

// export function Cart() {
//   return (
//     <Observer>
//       {() => (
//         <div>
//           <h2>Cart ({cartStore.totalItems})</h2>
//           <ul>
//             {cartStore.items.map((item) => (
//               <li key={item.id}>
//                 {item.name} - ${item.price} x {item.quantity}
//                 <button onClick={() => cartStore.removeFromCart(item.id)}>
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </Observer>
//   );
// }