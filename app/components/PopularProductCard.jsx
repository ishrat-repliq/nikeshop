import Image from "next/image";
import { star } from "../assets/icons";
import { Button } from ".";

const PopularProductCard = ({ imgURL, name, price,ref }) => {
  return (
    <div ref={ref} className='flex flex-1 flex-col w-full max-sm:w-full'>
      <Image src={imgURL} alt={name} width={282} height={282} />
      <div className='mt-8 flex justify-start gap-2.5'>
        <Image src={star} alt='rating icon' width={24} height={24} />
        <p className='font-montserrat text-xl leading-normal text-slate-gray'>
          (4.5)
        </p>
      </div>
      <h3 className='mt-2 text-2xl leading-normal font-semibold font-palanquin'>
        {name}
      </h3>
      <p className='mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal'>
        {price}
      </p>
      <div className="w-1/2">
      <Button label={'Buy Now'}/>
      </div>
    </div>
  );
};

export default PopularProductCard;
