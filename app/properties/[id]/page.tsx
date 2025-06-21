import Image from "next/image";
const PropertyDetailPage=()=>{
  return (
    <main className="max-w-[1500px] mx-auto px-6 pt-12">
    <div className="w-full h-[64vh] overflow-hidden rounded-xl relative ">
      <Image
           fill
           src='/beach_1.jpg'
           className="object-cover w-full h-full"
           alt="Beach house"/>
           

    </div>
     <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="py-6 pr-6 col-span-3">
         left side
      </div>
    <div>
        right
    </div>
   </div>
</main>
  )
}
export default PropertyDetailPage;