import defaultThumbnail from "@/assets/images/youtube.jpg";
import CustomButton from "@/components/commonComponents/Button/Button";
import Container from "@/components/commonComponents/Container/Container";
import ImageSlider from "@/components/commonComponents/ImageSlider/ImageSlider";
import { Title } from "@/components/commonComponents/Titles/Titles";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import HeaderButtons from "@/components/table/HeaderButtons";
import Pdf from "@/public/pdf.png";
import { capitalize } from "@/utils/common-utils";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProductViewWrapper = ({ data, onEdit }) => {
  const router = useRouter();
  const [openSection, setOpenSection] = useState(null);
  const {
    productName,
    sku,
    quantity,
    status,
    upcCode,
    isInStock,
    isWifiEnabled,
    mapPmap,
    salePrice,
    msrp,
    websiteActive,
    floorMatrix,
    saleOnWebsite,
    webPriceInactive,
    websiteOutlet,
    bestSeller,
    productHighlights,
    productFeature,
    categoryName,
    subCategoryName,
    productOverview,
    productSpecification,
    productManualGuide,
    brandName,
    rank,
    specialBuy,
    customPromotion,
    defaultAppliance,
    implementWebSeeSalePriceInCart,
    implementWebPdpCartMapOnly,
    implementWebPdpCartSalePriceOnly,
    implementWebsiteLoginSeeSalePrice,
    implementWebTradePartnerPrice,
    productImages,
    brandType,
    subCategory2,
    ...apiData
  } = data.data;
  const productImagesArr = productImages.map((item) => item.imageurl);

  const viewMoreBtn = (section) => (
    <div className="flex justify-end px-2 pt-4">
      <button
        onClick={() => toggleSection(section)}
        className="cursor-pointer justify-end flex text-blue-1 p-0 border-none focus-visible:outline-none font-medium "
      >
        {openSection === section ? "Show less" : "View more"}
      </button>
    </div>
  );

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="px-4 pb-5 mx-auto w-full">
      <HeaderButtons
        pageHeading={"View Product"}
        headerButtons={
          <div className="flex gap-3.5">
            <CustomButton
              onClick={() => router.back()}
              className=" py-2 px-6 border border-gray-light rounded-lg bg-white text-black font-semibold"
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={onEdit}
              className=" bg-primaryBtn text-white py-2 px-7 rounded-lg border-none"
            >
              Edit
            </CustomButton>
          </div>
        }
      />
      <div className=" pr-[5px] rounded-[0.75rem] relative">
        <div className="grid grid-cols-350 gap-4 items-start">
          <div className="pb-9 shadow-main rounded">
            <Container className={"text-gray-2"}>
              <div
                className={`${
                  openSection === "productDetails"
                    ? "max-height-auto overflow-unset"
                    : "max-h-[350px] overflow-hidden "
                }  transition-all ease-in-out duration-300`}
              >
                <Title className="mb-4">{productName || "N/A"}</Title>
                <div className="space-y-4">
                  <div className="flex mt-4">
                    <div className="w-[65%] grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-semibold">SKU</div>
                        <div className="text-sm mt-2">{sku || "N/A"}</div>
                      </div>
                      <div></div>
                      <div>
                        <div className="text-sm font-semibold">Brand</div>
                        <div className="text-sm mt-2">{brandName || "N/A"}</div>
                      </div>
                      <div className="pl-[53%]">
                        <div className="text-sm font-semibold">
                          Product Type
                        </div>
                        <div className="text-sm mt-2">
                          {capitalize(brandType) || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">UPC Code</div>
                        <div className="text-sm mt-2">{upcCode || "N/A"}</div>
                      </div>
                      <div className="pl-[53%]">
                        <div className="text-sm font-semibold">Quantity</div>
                        <div className="text-sm mt-2">{quantity || "N/A"}</div>
                      </div>
                      <div className=" flex w-[50%] justify-between mt-4">
                        <Toggle startText="InStock" isSelected={isInStock} />
                      </div>
                    </div>
                    {productImages.length > 0 && (
                      <ImageSlider productImages={productImagesArr} />
                    )}
                    {productImages.length === 0 && (
                      <div className=" w-[35%] border-2 border-gray-9 text-center content-center rounded-lg">
                        No Image Found
                      </div>
                    )}
                  </div>
                  <div className="">
                    <div className="text-sm font-semibold">Highlights</div>
                    <ul className="list-disc list-outside pl-2 mt-4 space-y-1">
                      {productHighlights.length > 0 &&
                        productHighlights.map((data, idx) => (
                          <li key={idx + 1} className="text-sm">
                            {data?.highlights}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              {viewMoreBtn("productDetails")}
            </Container>

            <Container className={"text-gray-2"}>
              <Title className="mb-4">Pricing</Title>

              <div className="space-y-4 ">
                <div className="mt-4 flex space-x-4">
                  <div className="w-1/2">
                    <div className="text-sm font-semibold">MAP/PMAP</div>
                    <div className="text-sm mt-2">${mapPmap}</div>
                  </div>
                  <div className="w-1/2">
                    <div className="text-sm font-semibold">Sale Price</div>
                    <div className="text-sm mt-2">${salePrice}</div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-4">
                  <div className="w-1/2">
                    <div className="text-sm font-semibold">MSRP</div>
                    <div className="text-sm mt-2">${msrp}</div>
                  </div>
                </div>
              </div>
            </Container>

            <Container className={"text-gray-2"}>
              <div
                className={`${
                  openSection === "productFeature"
                    ? "max-height-auto overflow-unset"
                    : "max-h-[200px] overflow-hidden "
                }  transition-all ease-in-out duration-300`}
              >
                <Title>Product Features</Title>
                <div className="space-y-4 ">
                  {productFeature.length > 0 &&
                    productFeature.map((feature, index) => (
                      <div key={index + 1}>
                        <div className="text-sm font-semibold">
                          {feature?.key}
                        </div>
                        <div className="text-sm mt-2">{feature?.value}</div>
                      </div>
                    ))}
                </div>
              </div>
              {viewMoreBtn("productFeature")}
            </Container>
            <Container className={"text-gray-2"}>
              <Title>Product Overview</Title>
              <div
                className={`${
                  openSection === "productOverview"
                    ? "max-height-auto overflow-unset"
                    : "max-h-[300px] overflow-hidden "
                }  transition-all ease-in-out duration-300`}
              >
                <div className="space-y-4">
                  {productOverview.length > 0 &&
                    productOverview.map((overview, index) => (
                      <div key={index + 1} className="flex items-start">
                        <div className="flex flex-col w-full sm:w-[80%] pr-4">
                          <div className="text-sm font-semibold">
                            {overview?.title}
                          </div>
                          <div className="text-sm mt-2">
                            {overview?.description}
                          </div>
                          {overview?.link && (
                            <div className="">
                              <div className="text-sm font-semibold mt-2">
                                Video URL
                              </div>
                              <Link
                                className="text-sm underline text-blue-1"
                                href={overview?.link}
                                target="_blank"
                              >
                                {overview?.link}
                              </Link>{" "}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center sm:justify-center w-full sm:w-1/2">
                          {overview?.image && (
                            <div className="w-44 h-32">
                              <Image
                                alt="product overview image"
                                src={overview?.image || defaultThumbnail.src}
                                width={100}
                                height={100}
                                layout="responsive"
                                className="rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {viewMoreBtn("productOverview")}
            </Container>

            <Container className={"text-gray-2"}>
              <Title>Specifications</Title>
              <div
                className={`${
                  openSection === "productSpecification"
                    ? "max-height-auto overflow-unset"
                    : "max-h-[420px] overflow-hidden "
                }  transition-all ease-in-out duration-300`}
              >
                <div className="space-y-2 ">
                  {productSpecification.length > 0 &&
                    productSpecification.map((specification, index) => (
                      <div key={index + 1}>
                        <div className="  pb-2">
                          <div className="text-sm w-1/2 mb-4 font-semibold ">
                            {specification?.category}
                          </div>
                          <div className=" flex-col w-1/2 gap-3 flex">
                            {specification?.details.map((detail, idx) => (
                              <div
                                key={idx + 1}
                                className=" flex items-center gap-1"
                              >
                                <div className="text-sm ">{detail.key}</div>
                                <div className="text-sm">({detail.unit})</div>
                                <div className="text-sm flex-1 text-right">
                                  {detail.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Divider className="" />
                      </div>
                    ))}
                </div>
              </div>
              {viewMoreBtn("productSpecification")}
            </Container>

            <Container className={"text-gray-2"}>
              <Title>Manual & Guides</Title>
              <div className="space-y-4 ">
                {productManualGuide.length > 0 &&
                  productManualGuide.map((manual, index) => (
                    <div key={index + 1} className="flex space-x-4 ">
                      <div className="text-sm font-semibold">
                        <Link href={manual?.fileURL} target="_blank">
                          <Image
                            src={Pdf.src}
                            height={30}
                            width={30}
                            alt="pdf"
                          />
                        </Link>
                      </div>
                      <div className="text-sm self-center ">
                        {manual?.fileName}
                      </div>
                    </div>
                  ))}
              </div>
            </Container>
          </div>
          <div>
            <Container className={"text-gray-2"}>
              <Title className={"mb-2"}>Status</Title>
              {status || "N/A"}
            </Container>

            <Container className={"text-gray-2"}>
              <Title className="mb-2">Website Status</Title>
              <div className="mt-4 w-full  grid grid-cols-1 grid-rows-6 gap-8">
                <Toggle
                  label="Website Active"
                  startText={websiteActive ? "" : "Inactive"}
                  isSelected={websiteActive}
                />
                <Toggle
                  label="Floor Matrix"
                  startText={floorMatrix ? "" : "No"}
                  isSelected={floorMatrix}
                />
                <Toggle
                  label="Sale On Website"
                  startText={saleOnWebsite ? "" : "Inactive"}
                  isSelected={saleOnWebsite}
                />
                <Toggle
                  label="Web Price"
                  startText={webPriceInactive ? "" : "Inactive"}
                  isSelected={webPriceInactive}
                />
                <Toggle
                  label="Website Outlet"
                  startText={websiteOutlet ? "" : "Inactive"}
                  isSelected={websiteOutlet}
                />
              </div>
            </Container>

            <Container className={"text-gray-2"}>
              <Title>Product organization</Title>
              <div className="space-y-4 ">
                <div className="">
                  <div className="text-sm font-semibold">Category</div>
                  <div className="text-sm mt-2">{categoryName || "N/A"}</div>
                </div>
                <div className="">
                  <div className="text-sm font-semibold">Sub Category</div>
                  <div className="text-sm mt-2">{subCategoryName || "N/A"}</div>
                </div>
                <div className="">
                  <div className="text-sm font-semibold">Sub Category 2</div>
                  <div className="text-sm mt-2">
                    {subCategory2?.subCategory2Name || "N/A"}
                  </div>
                </div>
              </div>
            </Container>

            <Container className={"text-gray-2"}>
              <Title className="mb-2">Offers</Title>
              <div className="mt-4 w-full  grid grid-cols-1 grid-rows-4 gap-8">
                <Toggle
                  label="Best Seller"
                  startText={bestSeller ? "" : "Inactive"}
                  isSelected={bestSeller}
                />
                <Toggle
                  label="Rank"
                  startText={rank ? "" : "Inactive"}
                  isSelected={rank}
                />
                <Toggle
                  label="Special Buy"
                  startText={specialBuy ? "" : "Inactive"}
                  isSelected={specialBuy}
                />
                <Toggle
                  label="Custom Promotion"
                  startText={customPromotion ? "" : "Inactive"}
                  isSelected={customPromotion}
                />
              </div>
            </Container>

            <Container className={"text-gray-2"}>
              <div className="w-full  grid grid-cols-1 grid-rows-4 gap-8">
                <Toggle
                  label="Default Appliance"
                  startText={defaultAppliance ? "" : "Inactive"}
                  isSelected={defaultAppliance}
                />
                <Toggle
                  label="Web See Sale Price In Cart"
                  startText={implementWebSeeSalePriceInCart ? "" : "No"}
                  isSelected={implementWebSeeSalePriceInCart}
                />
                <Toggle
                  label="Web PDP & Cart MAP Only"
                  startText={implementWebPdpCartMapOnly ? "" : "No"}
                  isSelected={implementWebPdpCartMapOnly}
                />
                <Toggle
                  label="Web PDP & Cart Sale Price Only"
                  startText={implementWebPdpCartSalePriceOnly ? "" : "No"}
                  isSelected={implementWebPdpCartSalePriceOnly}
                />
                <Toggle
                  label="Website Login to See Sale Price"
                  startText={implementWebsiteLoginSeeSalePrice ? "" : "No"}
                  isSelected={implementWebsiteLoginSeeSalePrice}
                />
                <Toggle
                  label="Web Trade Partner Price"
                  startText={implementWebTradePartnerPrice ? "" : "No"}
                  isSelected={implementWebTradePartnerPrice}
                />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewWrapper;
