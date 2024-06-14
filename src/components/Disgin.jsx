// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/QcayzFkxueL
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import Link from "next/link";
// import React from "react";
// import {
//   NavigationMenu,
//   NavigationMenuList,
//   NavigationMenuLink,
// } from "@/components/ui/navigation-menu";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import {
//   Pagination,
//   PaginationPage,
//   PaginationEllipsis,
// } from "@/components/ui/pagination";

// const Disgin = () => {
//   return (
//     <div className="flex h-screen w-full flex-col">
//       <header className="flex h-16 w-full shrink-0 items-center border-b border-gray-200 px-4 md:px-6 dark:border-gray-800">
//         <div className="flex items-center gap-4">
//           <Link href="#" className="flex items-center gap-2" prefetch={false}>
//             <MountainIcon className="h-6 w-6" />
//             <span className="text-lg font-semibold">Acme</span>
//           </Link>
//           <NavigationMenu className="hidden lg:flex">
//             <NavigationMenuList>
//               <NavigationMenuLink asChild>
//                 <Link
//                   href="#"
//                   className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
//                   prefetch={false}
//                 >
//                   Guide
//                 </Link>
//               </NavigationMenuLink>
//               <NavigationMenuLink asChild>
//                 <Link
//                   href="#"
//                   className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
//                   prefetch={false}
//                 >
//                   Recommend
//                 </Link>
//               </NavigationMenuLink>
//               <NavigationMenuLink asChild>
//                 <Link
//                   href="#"
//                   className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
//                   prefetch={false}
//                 >
//                   My Posts
//                 </Link>
//               </NavigationMenuLink>
//               <NavigationMenuLink asChild>
//                 <Link
//                   href="#"
//                   className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
//                   prefetch={false}
//                 >
//                   Chat
//                 </Link>
//               </NavigationMenuLink>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//         <div className="ml-auto flex gap-2">
//           <Button
//             variant="outline"
//             className="px-4 py-2 rounded-md font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
//           >
//             Login
//           </Button>
//           <Button className="px-4 py-2 rounded-md font-medium transition-colors bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
//             Sign Up
//           </Button>
//         </div>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="ml-auto lg:hidden">
//               <MenuIcon className="h-6 w-6" />
//               <span className="sr-only">Toggle navigation menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left">
//             <div className="grid gap-2 py-6">
//               <Link
//                 href="#"
//                 className="flex w-full items-center py-2 text-lg font-semibold"
//                 prefetch={false}
//               >
//                 Guide
//               </Link>
//               <Link
//                 href="#"
//                 className="flex w-full items-center py-2 text-lg font-semibold"
//                 prefetch={false}
//               >
//                 Recommend
//               </Link>
//               <Link
//                 href="#"
//                 className="flex w-full items-center py-2 text-lg font-semibold"
//                 prefetch={false}
//               >
//                 My Posts
//               </Link>
//               <Link
//                 href="#"
//                 className="flex w-full items-center py-2 text-lg font-semibold"
//                 prefetch={false}
//               >
//                 Chat
//               </Link>
//               <Link
//                 href="#"
//                 className="flex w-full items-center py-2 text-lg font-semibold"
//                 prefetch={false}
//               >
//                 Login
//               </Link>
//               <Link
//                 href="#"
//                 className="flex w-full items-center py-2 text-lg font-semibold"
//                 prefetch={false}
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </header>
//       <main className="flex-1 overflow-auto">
//         <div className="container px-4 md:px-6 py-8">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl font-bold">Board</h1>
//             <Button>
//               <PlusIcon className="mr-2 h-4 w-4" />
//               Add Post
//             </Button>
//           </div>
//           <div className="grid gap-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
//                 <h3 className="text-lg font-semibold">Post Title</h3>
//                 <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
//                   This is a sample post description. It can be a bit longer than
//                   the title.
//                 </p>
//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="w-6 h-6 border">
//                       <AvatarImage src="/placeholder-user.jpg" />
//                       <AvatarFallback>AC</AvatarFallback>
//                     </Avatar>
//                     <span className="text-sm font-medium">@username</span>
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     1 day ago
//                   </div>
//                 </div>
//               </div>
//               <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
//                 <h3 className="text-lg font-semibold">Post Title</h3>
//                 <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
//                   This is a sample post description. It can be a bit longer than
//                   the title.
//                 </p>
//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="w-6 h-6 border">
//                       <AvatarImage src="/placeholder-user.jpg" />
//                       <AvatarFallback>AC</AvatarFallback>
//                     </Avatar>
//                     <span className="text-sm font-medium">@username</span>
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     1 day ago
//                   </div>
//                 </div>
//               </div>
//               <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
//                 <h3 className="text-lg font-semibold">Post Title</h3>
//                 <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
//                   This is a sample post description. It can be a bit longer than
//                   the title.
//                 </p>
//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="w-6 h-6 border">
//                       <AvatarImage src="/placeholder-user.jpg" />
//                       <AvatarFallback>AC</AvatarFallback>
//                     </Avatar>
//                     <span className="text-sm font-medium">@username</span>
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     1 day ago
//                   </div>
//                 </div>
//               </div>
//               <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
//                 <h3 className="text-lg font-semibold">Post Title</h3>
//                 <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
//                   This is a sample post description. It can be a bit longer than
//                   the title.
//                 </p>
//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar className="w-6 h-6 border">
//                       <AvatarImage src="/placeholder-user.jpg" />
//                       <AvatarFallback>AC</AvatarFallback>
//                     </Avatar>
//                     <span className="text-sm font-medium">@username</span>
//                   </div>
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     1 day ago
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-center">
//               <Pagination>
//                 <div>1</div>
//                 <div>2</div>
//                 <div>3</div>
//                 <PaginationEllipsis />
//                 <div>10</div>
//               </Pagination>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// function MenuIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   );
// }

// function MountainIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
// }

// function PlusIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="M12 5v14" />
//     </svg>
//   );
// }

// export default Disgin;
