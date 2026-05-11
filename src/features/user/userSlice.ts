// Convert callback-based API to Promised API
function getPosition() {
  console.log("getPosition");
  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log("موفق:", {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //       accuracy: position.coords.accuracy, // متر
  //     });
  //   },
  //   (error) => {
  //     console.log("خطا:", error.message);
  //   },
  //   {
  //     enableHighAccuracy: true, // دقیق‌تر (GPS)
  //     timeout: 10000, // 10 ثانیه
  //     maximumAge: 60000, // 1 دقیقه کش
  //   },
  // );
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// const getLocationByIP = async () => {
//   try {
//     const res = await fetch("https://ip-api.ir/json");
//     const data = await res.json();

//     return {
//       city: data.city,
//       province: data.regionName,
//       country: data.country,
//       lat: data.lat,
//       lon: data.lon,
//       ip: data.query,
//     };
//   } catch (error) {
//     console.log("خطا:", error);
//   }
// };

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  console.log("fetchAddress");
  // const positionObj = await getPosition();
  // const position = {
  //   latitude: positionObj.coords.latitude,
  //   longitude: positionObj.coords.longitude,
  // };

  // console.log(positionObj, position);
  // // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  // const addressObj = await getAddress(position);
  // const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // // 3) Then we return an object with the data that we are interested in

  const res = await fetch("http://localhost:3000/api/position");
  const json = await res.json();

  console.log(json);

  const { latitude, longitude } = json.data;

  console.log({ latitude, longitude });

  const response = await fetch(
    `http://localhost:3000/api/address?latitude=${latitude}&longitude=${longitude}`,
  );
  const { data } = await response.json();

  const { position, address } = data;

  console.log({ position, address });
  return { position, address };
  // try {
  //   const res = await fetch("https://ip-api.ir/json");
  //   const data = await res.json();

  //   console.log({
  //     city: data.city,
  //     province: data.regionName,
  //     country: data.country,
  //     lat: data.lat,
  //     lon: data.lon,
  //     ip: data.query,
  //   });
  //   return {
  //     position: { latitude: data.lat, longitude: data.lon },
  //     address: data.city,
  //   };
  // } catch (error) {
  //   console.log("خطا:", error);
  // }
});

const initialState = {
  username: "",
  status: "idle",
  position: { latitude: "", longitude: "" },
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
    updateAddress(state, action) {
      state.address = action.payload;
      // state.position = initialState.position;   remove prev position
      state.status = "idle"; // remove error status because the user changed the input
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName, updateAddress } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (store) => store.user.username;
