from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


class RegisterView(APIView):
    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        password = request.data.get("password")

        # ✅ VALIDATION (THIS WAS MISSING)
        if not name or not email or not password:
            return Response(
                {"error": "All fields are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(username=email).exists():
            return Response(
                {"error": "Email already registered"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name,
        )

        return Response(
            {"message": "Signup successful"},
            status=status.HTTP_201_CREATED,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        "name": user.first_name,
        "email": user.email,
    })
