package sg.edu.nus.iss.server.dto;

public class PurchaseResponse {

    private String orderTrackingNumber;

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }

    public void setOrderTrackingNumber(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((orderTrackingNumber == null) ? 0 : orderTrackingNumber.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PurchaseResponse other = (PurchaseResponse) obj;
        if (orderTrackingNumber == null) {
            if (other.orderTrackingNumber != null)
                return false;
        } else if (!orderTrackingNumber.equals(other.orderTrackingNumber))
            return false;
        return true;
    } 

    
    
}
