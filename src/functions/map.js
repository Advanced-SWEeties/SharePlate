function formatAddressForMaps(address) {
  let formattedAddress = address.trim().replace(/\s+/g, '+');

  formattedAddress = formattedAddress.replace(/\+/g, (match, offset, string) => {
    return /[A-Z0-9]{8}\+/.test(string) ? '%2B' : match;
  });

  return formattedAddress;
}

export const generateGoogleMapsIframe = (address, width, height) => {
  if (!address || !process.env.REACT_APP_GOOGLE_MAPS_API_KEY) return null;
  console.log(address)
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  const formattedAddress = formatAddressForMaps(address)
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${formattedAddress}`;
  console.log('Embedding', googleMapsEmbedUrl)
  return (
    <iframe
      width={width}
      height={height}
      frameBorder="0"
      style={{ border: 0 }}
      src={googleMapsEmbedUrl}
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Maps Location"
    ></iframe>
  );
};
