import type { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import { deploymentURL } from '../../libs/env'

export const config = {
  runtime: 'edge',
}

export default function handler(req: NextRequest) {
  try {
    const defaultBackgroundImage = `${deploymentURL}/images/bg.jpg`
    const defaultLogo = `${deploymentURL}/images/lrmn.png`
    const defaultAuthor = 'L RMN'
    const defaultExtra = (
      <svg width="24" height="24" viewBox="0 0 48 48" fill="color" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4013 44.4312C4.55914 40.203 0 32.634 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C23.3639 48 22.7336 47.9752 22.1099 47.9267L24.4708 41.4403C24.8614 40.367 26.1654 38.9293 27.3153 37.6602C27.9736 36.9357 28.541 36.3089 28.7577 35.9406C29.8029 34.1605 32.991 28.8133 33.0232 28.7592C33.6783 27.8197 34.7297 26.2132 35.3778 25.1648L38.918 19.4132C39.5656 18.3618 39.6146 17.0423 39.0272 16.4728C38.924 16.3733 38.803 16.2977 38.6682 16.2487C38.0191 16.0124 37.1567 16.3954 36.5216 17.2017L32.9627 22.1642C32.5511 22.6872 32.0908 23.116 31.6452 23.5312C31.2744 23.8765 30.8918 24.2343 30.5491 24.6332L30.1856 25.0583C30.1413 25.1092 30.0797 25.1405 30.0126 25.145C29.9456 25.1494 29.882 25.1411 29.8238 25.1199C29.6969 25.0737 29.4925 24.9288 29.548 24.4768C29.56 24.4212 30.183 21.803 28.5308 21.1055L28.4586 21.078C27.5656 20.753 26.8544 21.3114 26.065 22.2504C25.9463 22.3915 25.7034 22.4048 25.5809 22.3602C25.3389 22.26 25.232 22.0454 25.2881 21.7959C25.5698 20.5361 25.0504 19.358 24.0532 18.995L23.9764 18.9694C23.1085 18.6909 22.0613 19.0476 21.4333 19.8397C21.4101 19.8682 21.383 19.8911 21.3511 19.9071C21.2264 20.0261 21.0123 20.1917 20.7794 20.1069C20.53 20.0161 20.4707 19.7125 20.4482 19.4916L20.4201 19.2177C20.393 18.9464 20.3582 18.6334 20.3185 18.2972C20.1937 17.1984 20.0379 15.8304 20.0628 14.9217L20.4456 8.46387C20.4722 7.52071 20.0383 6.71688 19.3665 6.47235C19.1769 6.40337 18.9775 6.38184 18.7733 6.40762C17.8236 6.52978 17.0078 7.60646 16.9152 8.85946L16.2104 15.3886C16.1615 16.0495 16.1769 16.9728 16.1921 17.8654C16.2034 18.5279 16.2141 19.1535 16.1984 19.6589L16.137 21.7413C16.1151 22.4427 15.8912 22.9455 15.4704 23.2357C15.2384 23.399 14.4576 23.9602 13.6132 24.7475C13.5205 24.8341 13.4266 24.9165 13.3346 24.9979C12.7114 25.5502 12.1739 26.0273 12.1221 27.6111C12.0949 28.355 12.1293 29.1112 12.2365 30.2219C12.3485 31.3881 12.6931 32.1196 13.0587 32.8939C13.5795 33.9974 14.602 35.6375 13.9135 37.5291C13.908 37.5442 12.2479 42.1054 11.4013 44.4312Z" fill="black"/>
      </svg>
    )
    const defaultTitle = 'A concise and lightweight blog.'
    const { searchParams } = new URL(req.url)
    // ?theme=<theme>
    const theme = searchParams.get('theme')?.slice(0, 100)
    // ?border=<border>
    const border = searchParams.get('border')?.slice(0, 100) || 'solid'
    // ?rounded=<rounded>
    const rounded = searchParams.get('rounded')?.slice(0, 100) || 'rounded'
    // ?title=<title>
    const title = searchParams.get('title')?.slice(0, 100)
    // ?backgroundImage=<backgroundImage>
    const backgroundImage = searchParams.get('backgroundImage')?.slice(0)
    // ?logo=<logo>
    const logo = searchParams.get('logo')?.slice(0)
    // ?author=<author>
    const author = searchParams.get('author')?.slice(0, 100)
    // ?extra=<extra>
    const extra = searchParams.get('extra')?.slice(0, 200)

    return new ImageResponse(
      (
        <div
          tw={`
            flex
            flex-col
            items-center
            flex-nowrap
            pt-25
            w-full
            h-full
            ${theme === 'dark' ? 'text-white' : ''}
          `}
        >
          <img src={backgroundImage || defaultBackgroundImage} tw="absolute w-[800px]" alt="background" />
          <div
            tw="flex items-center"
          >
            <img src={logo || defaultLogo} width="80" alt="logo"
              tw={`
                ${rounded === 'rounded' ? 'rounded-full' : 'rounded-none'}
                ${border === 'solid' ? 'border border-gray-400' : ''}
                shrink-0
              `}
            />
            <div
              tw={`
                ml-4 pl-4 pr-1 text-2xl
                ${theme === 'dark' ? 'border-l-white' : 'border-l-gray-500'}
                ${border === 'solid' ? 'border-l-2' : ''}
              `}
            >
                { author || defaultAuthor}
            </div>
            { extra || defaultExtra }
          </div>
          <div
            tw="mt-15 text-3xl"
          >
            {title || defaultTitle}
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
      },
    )
  }
  catch (e: any) {
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
