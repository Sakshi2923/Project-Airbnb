import Image from "next/image";
import ResevationSidebar from "@/app/components/properties/ReservationSidebar";
const PropertyDetailPage=()=>{
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 pt-12">
    <div className="w-full mb-4 h-[64vh] overflow-hidden rounded-xl relative ">
      <Image
           fill
           src='/beach_1.jpg'
           className="object-cover w-full h-full"
           alt="Beach house"/>
           

    </div>
     <div className=" grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="py-6 pr-6 col-span-3">
         <h1 className="mb-4 text-4xl">Property name</h1>
         <span className="mb-6 block text-lg text-gray-600">
          4-guests-2 bedrooms- 1 bathroom
         </span>
         <hr />
         <div className="py-6 flex items-center space-x-4">
          <Image
             src="/profile_pic_1.jpg"
             width={50}
             height={50}
             className="rounded-full"
             alt="The user name"/>
             <p><strong>John Doe is your host</strong></p>
            
         </div>
          <hr />
          <p className="mt-6 text-lg">dnjdsncsdcjksnjxkcsnjkddcneksndxjkwsndx</p>
      </div>
    <ResevationSidebar/>
   </div>
</main>
  )
}
export default PropertyDetailPage;