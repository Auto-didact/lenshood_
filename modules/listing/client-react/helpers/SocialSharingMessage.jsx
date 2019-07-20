export function MyListingsMessage(id, gearCategory, gearSubcategory) {
  const link = `https://www.lenshood.in`,
    listLink = `https://www.lenshood.in/listing-detail/${id}`;

  const whatsappMessage = `Hey, I have put my photography equipment - ${
    gearSubcategory ? gearSubcategory : gearCategory
  } on lenshood, you can check it here ${listLink}. Checkout other listings at ${link}.`;
  const twitterMessage = {
    text: `Hey, I have put my photography equipment - ${
      gearSubcategory ? gearSubcategory : gearCategory
    }  on lenshood.`,
    hashtag: "#lenshood #earncash #renting #lending",
    link: listLink
  };
  const emailMessage = `Hey, I have put my photography equipment - ${
    gearSubcategory ? gearSubcategory : gearCategory
  } on lenshood, you can check it here <a href="${listLink}">${listLink}</a>. Checkout other listings at <a href="${link}">${link}</a>.`;
  return { whatsappMessage, twitterMessage, link: listLink, emailMessage };
}

export function ListingsMessage(id, username, gearCategory, gearSubcategory) {
  const link = `https://www.lenshood.in/`,
    listLink = `https://www.lenshood.in/listing-detail/${id}`;

  const whatsappMessage = `Hey, check out this cool photography equipment - ${
    gearSubcategory ? gearSubcategory : gearCategory
  } by ${username} on lenshood, you can check it here ${listLink}. Checkout other listings at ${link}.`;
  const twitterMessage = {
    text: `Hey, check out this cool photography equipment - ${
      gearSubcategory ? gearSubcategory : gearCategory
    } by ${username} on lenshood,`,
    hashtag: "#lenshood #earncash #renting #lending",
    link: listLink
  };
  const emailMessage = `Hey, I have put my photography equipment - ${
    gearSubcategory ? gearSubcategory : gearCategory
  } on lenshood, you can check it here <a href="${listLink}">${listLink}</a>. Checkout other listings at <a href="${link}">${link}</a>.`;
  return { whatsappMessage, twitterMessage, link: listLink, emailMessage };
}
