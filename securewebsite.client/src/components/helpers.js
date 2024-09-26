export const fetchData = async (setUserInfo) => {
	try {
		const user = localStorage.getItem("user");
		const response = await fetch("api/SecureWebsite/home/" + user, {
		  method: "GET",
		  credentials: "include",
		});
		
		const data = await response.json();
		setUserInfo(data.userInfo);
		console.log("user info: ", data.userInfo);
	  } catch (error) {
		console.log("Error home page: ", error);
	  }
}