from rest_framework import permissions


class IsUploaderOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow uploaders to edit or delete their own videos.
    """

    def has_permission(self, request, view):
        # Allow any user to list or retrieve
        if view.action in ["list", "retrieve"]:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow any user to list or retrieve
        if view.action in ["list", "retrieve"]:
            return True

        # Allow only the uploader to create, update, or delete
        return obj.uploader == request.user
