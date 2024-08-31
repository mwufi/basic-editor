'use client'

import Image from 'next/image'

const MobileLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mobile-Friendly Layout</h1>
      
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
      </p>

      <div className="relative w-full max-w-[650px] aspect-[16/9] mx-auto my-8">
        <Image
          src="https://picsum.photos/650/366"
          alt="Random image from Picsum"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <p className="mb-4">
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Nullam quis risus eget urna mollis ornare vel eu leo.
      </p>

      <p className="mb-4">
        Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      </p>

      <p className="mb-4">
        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </p>
    </div>
  )
}

export default MobileLayout
