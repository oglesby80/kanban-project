import * as jwtDecode from 'jwt-decode';


interface JwtPayload {
  exp?: number; // The expiration time of the token, in seconds since the epoch
  [key: string]: any; // Other payload properties
}

class AuthService {
  // Method to get the decoded user profile from the token
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Method to check if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (exp) {
        return Date.now() >= exp * 1000; // Convert expiration time to milliseconds
      }
      return true; // If 'exp' is missing, consider the token expired
    } catch (error) {
      return true; // On error, consider the token expired
    }
  }

  // Method to get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('jwt'); // Retrieve token from local storage
  }

  // Method to log in the user by storing the token and redirecting to the homepage
  login(idToken: string): void {
    localStorage.setItem('jwt', idToken); // Store JWT token in localStorage
    window.location.assign('/board'); // Redirect to board page (or homepage)
  }

  // Method to log out the user by removing the token and redirecting to the login page
  logout(): void {
    localStorage.removeItem('jwt'); // Remove JWT token from localStorage
    window.location.assign('/login'); // Redirect to login page
  }
}

export default new AuthService();

